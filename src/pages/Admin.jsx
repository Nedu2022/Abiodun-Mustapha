import { useEffect, useMemo, useState } from 'react'
import { Cloud, Download, Eye, EyeOff, FileUp, Plus, Save, Search, Settings, X, FileText, Video, ArrowLeft, Tag as TagIcon, Lock, LogOut, Mail, KeyRound, Globe, Send, Trash2 } from 'lucide-react'
import Seo from '../seo/Seo'
import { pages } from '../seo/config'
import { Field, Label, areaClass, inputClass } from '../components/admin/Field'
import BlockEditor from '../components/admin/BlockEditor'
import PostBody from '../components/blog/PostBody'
import VideoManager from '../components/admin/VideoManager'
import { TAGS, allPosts, emptyPost, formatDate, readingTime, slugify, saveLivePosts, fetchLivePosts, loadAllTagsFromApi, saveAllTagsToApi } from '../lib/posts'

export default function Admin() {
  // Authentication State
  const [authenticated, setAuthenticated] = useState(false)
  const [emailInput, setEmailInput] = useState('abiodunmustapha11@gmail.com')
  const [passwordInput, setPasswordInput] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  // Password Change State
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [currentPasswordInput, setCurrentPasswordInput] = useState('')
  const [newPasswordInput, setNewPasswordInput] = useState('')
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [activeTab, setActiveTab] = useState('posts') // 'posts' | 'videos'
  const [posts, setPosts] = useState(allPosts)
  const [activeId, setActiveId] = useState(() => allPosts[0]?.id || null)
  const [query, setQuery] = useState('')
  const [dirty, setDirty] = useState(false)
  const [preview, setPreview] = useState(false)
  const [toast, setToast] = useState('')
  const [loading, setLoading] = useState(true)
  
  // Custom Tag Creation state
  const [allTags, setAllTags] = useState(TAGS)
  const [newTagInput, setNewTagInput] = useState('')

  // Mobile View state ('list' | 'edit')
  const [mobileView, setMobileView] = useState('list')

  const active = posts.find((post) => post.id === activeId) || null

  // Load posts and tags from DB on mount
  useEffect(() => {
    async function init() {
      try {
        const [dbPosts, dbTags] = await Promise.all([
          fetchLivePosts(),
          loadAllTagsFromApi(),
        ])
        if (dbPosts.length > 0) {
          setPosts(dbPosts)
          setActiveId(dbPosts[0]?.id || null)
        }
        if (dbTags.length > 0) setAllTags(dbTags)
      } catch {}
      setLoading(false)
    }
    init()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!emailInput.trim() || !passwordInput.trim()) {
      setAuthError('Please enter both email and password.')
      return
    }
    setLoginLoading(true)
    try {
      const res = await fetch('/api/auth?action=login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput.trim(), password: passwordInput }),
      })
      if (res.ok) {
        setAuthenticated(true)
        setAuthError('')
        setToast('Welcome back, Admin!')
      } else {
        const data = await res.json()
        setAuthError(data.error || 'Invalid credentials. Please try again.')
      }
    } catch {
      setAuthError('Network error. Please try again.')
    }
    setLoginLoading(false)
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    if (newPasswordInput.length < 4) {
      setPasswordError('New password must be at least 4 characters.')
      return
    }
    if (newPasswordInput !== confirmPasswordInput) {
      setPasswordError('New password and confirmation do not match.')
      return
    }

    try {
      const res = await fetch('/api/auth?action=change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: currentPasswordInput, newPassword: newPasswordInput }),
      })
      if (res.ok) {
        setShowPasswordModal(false)
        setCurrentPasswordInput('')
        setNewPasswordInput('')
        setConfirmPasswordInput('')
        setPasswordError('')
        setToast('Password updated in database!')
      } else {
        const data = await res.json()
        setPasswordError(data.error || 'Failed to change password.')
      }
    } catch {
      setPasswordError('Network error. Please try again.')
    }
  }

  const handleLogout = () => {
    setAuthenticated(false)
    setToast('Logged out successfully.')
  }

  useEffect(() => {
    if (!toast) return undefined
    const id = setTimeout(() => setToast(''), 2600)
    return () => clearTimeout(id)
  }, [toast])

  const listed = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return posts
    return posts.filter((post) => post.title.toLowerCase().includes(needle))
  }, [posts, query])

  const patch = (changes) => {
    setPosts((current) =>
      current.map((post) =>
        post.id === activeId
          ? { ...post, ...changes, updatedAt: new Date().toISOString().slice(0, 10) }
          : post
      )
    )
    setDirty(true)
  }

  const save = async () => {
    await saveLivePosts(posts)
    setDirty(false)
    setToast('Saved to database!')
  }

  const publishPostLive = async () => {
    if (!active) return
    const updatedPost = { ...active, status: 'published', updatedAt: new Date().toISOString().slice(0, 10) }
    const nextPosts = posts.map((p) => (p.id === active.id ? updatedPost : p))
    setPosts(nextPosts)
    await saveLivePosts(nextPosts)
    setDirty(false)
    setToast(`Published "${updatedPost.title || 'Untitled'}" Live!`)
  }

  const createPost = () => {
    const fresh = emptyPost()
    setPosts((current) => [fresh, ...current])
    setActiveId(fresh.id)
    setMobileView('edit')
    setDirty(true)
  }

  // Delete Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState(null)
  const deleteTarget = posts.find((p) => p.id === deleteTargetId) || null

  const removePost = () => {
    if (!active) return
    setDeleteTargetId(active.id)
    setShowDeleteModal(true)
  }

  const confirmDeletePost = async () => {
    if (!deleteTargetId) return
    const target = posts.find((p) => p.id === deleteTargetId)
    const title = target?.title || 'Untitled'
    const nextPosts = posts.filter((post) => post.id !== deleteTargetId)
    setPosts(nextPosts)
    await saveLivePosts(nextPosts)
    setActiveId(nextPosts[0]?.id || null)
    setMobileView('list')
    setShowDeleteModal(false)
    setDeleteTargetId(null)
    setDirty(false)
    setToast(`Deleted "${title}" from database!`)
  }

  const importFile = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result))
        if (!Array.isArray(parsed)) throw new Error('not an array')
        setPosts(parsed)
        setActiveId(parsed[0]?.id || null)
        setDirty(true)
        setToast(`Loaded ${parsed.length} posts`)
      } catch {
        setToast('That file is not a valid posts.json')
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  const toggleTag = (tag) => {
    if (!active) return
    const tags = active.tags || []
    patch({ tags: tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag] })
  }

  const handleCreateTag = async (e) => {
    e.preventDefault()
    const trimmed = newTagInput.trim()
    if (!trimmed) return
    let updatedTags = allTags
    if (!allTags.includes(trimmed)) {
      updatedTags = [...allTags, trimmed]
      setAllTags(updatedTags)
      await saveAllTagsToApi(updatedTags)
    }
    if (active && !(active.tags || []).includes(trimmed)) {
      const currentTags = active.tags || []
      patch({ tags: [...currentTags, trimmed] })
    }
    setNewTagInput('')
    setToast(`Tag "${trimmed}" saved to database!`)
  }

  if (!authenticated) {
    return (
      <>
        <Seo {...pages.admin} noindex />
        <div className="flex min-h-svh flex-col items-center justify-center bg-charcoal p-4 text-cream">
          <div className="w-full max-w-md rounded-2xl border border-gold/30 bg-charcoal-light p-6 sm:p-8 shadow-2xl backdrop-blur-md">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold mb-3 border border-gold/30">
                <Lock className="h-7 w-7" />
              </div>
              <span className="font-display text-2xl italic text-gold">AM Studio</span>
              <h1 className="mt-1 font-display text-xl font-medium tracking-wide text-cream">
                Admin Authentication
              </h1>
              <p className="mt-1 text-[13px] text-cream/70">
                Enter your credentials to access the studio.
              </p>
            </div>

            <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4">
              {authError && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-[13px] text-red-300 text-center">
                  {authError}
                </div>
              )}

              <div>
                <label className="block text-[11px] font-medium uppercase tracking-[0.14em] text-cream/70 mb-1">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 h-4 w-4 text-cream/40" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="abiodunmustapha11@gmail.com"
                    className="w-full rounded-lg border border-cream/20 bg-charcoal/80 pl-10 pr-3 py-2.5 text-[14px] text-cream outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium uppercase tracking-[0.14em] text-cream/70 mb-1">
                  Password
                </label>
                <div className="relative flex items-center">
                  <KeyRound className="absolute left-3.5 h-4 w-4 text-cream/40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-cream/20 bg-charcoal/80 pl-10 pr-10 py-2.5 text-[14px] text-cream outline-none focus:border-gold"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 text-cream/40 hover:text-cream cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-gold py-3 text-[13px] font-medium uppercase tracking-[0.14em] text-white hover:bg-gold-bright transition-all cursor-pointer shadow-lg"
              >
                Sign In to Admin
              </button>
            </form>

            <div className="mt-6 border-t border-cream/10 pt-4 text-center text-[12px] text-cream/50">
              Protected Studio Portal
            </div>
          </div>
          {toast && (
            <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 bg-charcoal-light border border-gold/40 px-5 py-3 text-[13px] text-cream shadow-lg">
              {toast}
            </div>
          )}
        </div>
      </>
    )
  }

  return (
    <>
      <Seo {...pages.admin} noindex />

      <div className="min-h-svh bg-white">
        <header className="sticky top-0 z-30 border-b border-charcoal/20 bg-charcoal text-cream">
          <div className="mx-auto flex max-w-[100rem] flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex items-center justify-between gap-3 sm:justify-start">
              <div className="flex items-baseline gap-2 sm:gap-3">
                <span className="font-display text-lg italic text-gold">AM</span>
                <span className="text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.16em] text-cream/70">
                  Admin Panel
                </span>
                {dirty && activeTab === 'posts' && (
                  <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[9px] uppercase tracking-[0.12em] text-gold sm:px-2.5 sm:text-[10px]">
                    Unsaved
                  </span>
                )}
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-1 border-l border-cream/20 pl-3 sm:pl-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('posts')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] sm:text-[12px] uppercase tracking-[0.1em] rounded-md transition-colors ${
                    activeTab === 'posts' ? 'bg-gold text-white font-medium' : 'text-cream/70 hover:text-cream'
                  }`}
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span className="hidden xs:inline sm:inline">Posts</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('videos')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] sm:text-[12px] uppercase tracking-[0.1em] rounded-md transition-colors ${
                    activeTab === 'videos' ? 'bg-gold text-white font-medium' : 'text-cream/70 hover:text-cream'
                  }`}
                >
                  <Video className="h-3.5 w-3.5" />
                  <span className="hidden xs:inline sm:inline">Videos</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPasswordError('')
                    setShowPasswordModal(true)
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] sm:text-[12px] uppercase tracking-[0.1em] rounded-md text-cream/70 hover:text-cream hover:bg-cream/10 transition-colors cursor-pointer"
                  title="Change Password"
                >
                  <KeyRound className="h-3.5 w-3.5 text-gold" />
                  <span className="hidden sm:inline">Password</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {activeTab === 'posts' && (
                <>
                  <button
                    type="button"
                    onClick={() => setPreview((v) => !v)}
                    className="inline-flex items-center gap-1.5 border border-cream/25 px-2.5 py-1.5 text-[11px] sm:text-[12px] uppercase tracking-[0.1em] text-cream/80 transition-colors hover:border-gold hover:text-gold rounded-md"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    {preview ? 'Edit' : 'Preview'}
                  </button>
                  <button
                    type="button"
                    onClick={save}
                    className="inline-flex items-center gap-1.5 bg-slate-700 px-3.5 py-1.5 text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-slate-800 rounded-md cursor-pointer"
                  >
                    <Save className="h-3.5 w-3.5" />
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={publishPostLive}
                    className="inline-flex items-center gap-1.5 bg-green px-3.5 py-1.5 text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-green-deep rounded-md cursor-pointer shadow-xs"
                    title="Publish this article live to the site"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    Publish Live
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 border border-red-500/40 px-2.5 py-1.5 text-[11px] sm:text-[12px] uppercase tracking-[0.1em] text-red-400 transition-colors hover:bg-red-500 hover:text-white cursor-pointer ml-1 sm:ml-2 rounded-md"
                title="Sign Out of Admin Studio"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </header>

        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/80 p-4 backdrop-blur-xs">
            <div className="w-full max-w-md rounded-2xl border border-gold/30 bg-charcoal p-6 text-cream shadow-2xl">
              <div className="flex items-center justify-between border-b border-cream/10 pb-4">
                <h3 className="font-display text-lg text-gold flex items-center gap-2">
                  <KeyRound className="h-5 w-5" /> Change Admin Password
                </h3>
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="text-cream/60 hover:text-cream cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handlePasswordChange} className="mt-5 flex flex-col gap-4">
                {passwordError && (
                  <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-[13px] text-red-300 text-center">
                    {passwordError}
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-[0.14em] text-cream/70 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPasswordInput}
                    onChange={(e) => setCurrentPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-cream/20 bg-charcoal-light px-3.5 py-2.5 text-[14px] text-cream outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-[0.14em] text-cream/70 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-cream/20 bg-charcoal-light px-3.5 py-2.5 text-[14px] text-cream outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-[0.14em] text-cream/70 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPasswordInput}
                    onChange={(e) => setConfirmPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-cream/20 bg-charcoal-light px-3.5 py-2.5 text-[14px] text-cream outline-none focus:border-gold"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 mt-2 pt-3 border-t border-cream/10">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="px-4 py-2 text-[12px] text-cream/70 hover:text-cream cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-gold px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.12em] text-white hover:bg-gold-bright transition-all cursor-pointer shadow-md"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showDeleteModal && deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/80 p-4 backdrop-blur-xs">
            <div className="w-full max-w-md rounded-2xl border border-red-500/30 bg-charcoal p-6 text-cream shadow-2xl">
              <div className="flex items-center justify-between border-b border-cream/10 pb-4">
                <h3 className="font-display text-lg text-red-400 flex items-center gap-2">
                  <Trash2 className="h-5 w-5" /> Confirm Article Deletion
                </h3>
                <button
                  type="button"
                  onClick={() => { setShowDeleteModal(false); setDeleteTargetId(null) }}
                  className="text-cream/60 hover:text-cream cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="mt-4 text-[14px] text-cream/90 leading-relaxed">
                Are you sure you want to delete <strong className="text-gold">"{deleteTarget.title || 'Untitled Post'}"</strong>? This action cannot be undone.
              </p>

              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-cream/10">
                <button
                  type="button"
                  onClick={() => { setShowDeleteModal(false); setDeleteTargetId(null) }}
                  className="px-4 py-2 text-[12px] font-medium text-cream/70 hover:text-cream cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDeletePost}
                  className="rounded-lg bg-red-600 px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.12em] text-white hover:bg-red-700 transition-all cursor-pointer shadow-md"
                >
                  Delete Post
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'videos' ? (
          <VideoManager setToast={setToast} />
        ) : (
          <div className="mx-auto grid max-w-[100rem] gap-0 px-0 lg:grid-cols-[320px_1fr]">
              {/* Post List Sidebar: Always visible on desktop, visible on mobile when mobileView === 'list' */}
              <aside className={`${mobileView === 'edit' ? 'hidden lg:block' : 'block'} border-b border-gold/20 bg-[#FAF7F2] lg:min-h-svh lg:border-b-0 lg:border-r lg:border-gold/25`}>
                <div className="flex items-center gap-2 border-b border-gold/20 px-4 py-3.5 bg-gold/10">
                  <Search className="h-4 w-4 flex-none text-gold" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search posts..."
                    className="w-full bg-transparent text-[14px] text-slate-900 outline-none placeholder:text-slate-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={createPost}
                  className="flex w-full items-center gap-2 border-b border-gold/20 bg-gold/15 px-4 py-3.5 text-left text-[12px] font-medium uppercase tracking-[0.12em] text-gold hover:bg-gold hover:text-white transition-all cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  + New Article
                </button>

                <ul className="flex flex-col">
                  {listed.map((post) => (
                    <li key={post.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveId(post.id)
                          setPreview(false)
                          setMobileView('edit')
                        }}
                        className={`flex w-full flex-col gap-1 border-b border-gold/15 px-4 py-3.5 text-left transition-colors ${
                          post.id === activeId ? 'bg-gold/15 border-l-4 border-l-gold text-slate-900' : 'hover:bg-gold/10'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={`h-1.5 w-1.5 flex-none rounded-full ${
                              post.status === 'published' ? 'bg-green' : 'bg-gold'
                            }`}
                          />
                          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-600">
                            {post.status === 'published' ? formatDate(post.publishedAt) : 'Draft'}
                          </span>
                        </span>
                        <span className="font-display text-[15px] text-slate-900">
                          {post.title || 'Untitled'}
                        </span>
                      </button>
                    </li>
                  ))}
                  {listed.length === 0 && (
                    <li className="px-4 py-6 text-[14px] italic text-slate-500">Nothing matches that.</li>
                  )}
                </ul>
              </aside>

              {/* Main Post Editor: Always visible on desktop, visible on mobile when mobileView === 'edit' */}
              <div className={`${mobileView === 'list' ? 'hidden lg:block' : 'block'} px-4 py-6 sm:px-8 sm:py-8`}>
                {/* Mobile Back Button */}
                <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4 lg:hidden">
                  <button
                    type="button"
                    onClick={() => setMobileView('list')}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-[12px] font-medium uppercase tracking-[0.12em] text-slate-900 transition-colors hover:bg-cream cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Posts
                  </button>
                  {active && (
                    <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-slate-700 truncate max-w-[160px]">
                      {active.title || 'Untitled'}
                    </span>
                  )}
                </div>

                {!active && (
                  <p className="font-display text-xl italic text-slate-600">
                    Pick a post from the list, or start a new article.
                  </p>
                )}

                {active && preview && (
                  <article className="mx-auto max-w-3xl">
                    <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold">
                      {(active.tags || []).join(' · ') || 'Untagged'} · {readingTime(active)} min read
                    </span>
                    <h1 className="mt-4 font-display text-[2.1rem] leading-[1.08] text-slate-900 sm:text-[2.6rem]">
                      {active.title || 'Untitled'}
                    </h1>
                    <p className="mt-4 font-display text-lg italic text-slate-600">{active.excerpt}</p>
                    {active.cover && (
                      <img
                        src={active.cover}
                        alt={active.coverAlt || ''}
                        className="mt-8 aspect-[16/9] w-full object-cover rounded-xl"
                      />
                    )}
                    <div className="mt-8">
                      <PostBody body={active.body} />
                    </div>
                  </article>
                )}

                {active && !preview && (
                  <div className="mx-auto flex max-w-3xl flex-col gap-6">
                    {/* Medium-style Large Title Input */}
                    <div className="flex flex-col gap-2">
                      <Label hint={`${active.title.length}/70`}>Title</Label>
                      <input
                        value={active.title}
                        onChange={(e) => {
                          const title = e.target.value
                          const autoSlug = !active.slug || active.slug === slugify(active.title)
                          patch(autoSlug ? { title, slug: slugify(title) } : { title })
                        }}
                        placeholder="Title of your story..."
                        className="w-full border-b border-slate-300 bg-transparent py-2 font-display text-2xl text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-gold sm:text-3xl"
                      />
                    </div>

                    <Field label="URL" hint={active.status === 'published' ? 'Locked once live' : 'Editable'}>
                      <div className="flex items-center gap-0 border border-line bg-white">
                        <span className="whitespace-nowrap pl-4 text-[14px] text-ink-faint">/blog/</span>
                        <input
                          value={active.slug}
                          onChange={(e) => patch({ slug: slugify(e.target.value) })}
                          className="w-full bg-transparent px-1 py-3 text-[15px] outline-none"
                        />
                      </div>
                    </Field>

                    <Field label="Summary" hint={`${active.excerpt.length}/160`}>
                      <textarea
                        value={active.excerpt}
                        onChange={(e) => patch({ excerpt: e.target.value })}
                        rows={2}
                        placeholder="One sentence. This becomes the search result description."
                        className={areaClass}
                      />
                    </Field>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field label="Cover image">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                          <input
                            value={active.cover}
                            onChange={(e) => patch({ cover: e.target.value })}
                            placeholder="Image URL or choose file from laptop..."
                            className={`${inputClass} flex-1`}
                          />
                          <label className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-gold px-4 py-2.5 text-[12px] font-medium uppercase tracking-[0.1em] text-white hover:bg-gold-bright transition-colors whitespace-nowrap shadow-xs">
                            <FileUp className="h-4 w-4" />
                            <span>Choose Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (!file) return
                                const reader = new FileReader()
                                reader.onload = (event) => {
                                  patch({ cover: event.target?.result })
                                  setToast('Cover image selected!')
                                }
                                reader.readAsDataURL(file)
                              }}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </Field>
                      <Field label="Cover description" hint="Required for search">
                        <input
                          value={active.coverAlt}
                          onChange={(e) => patch({ coverAlt: e.target.value })}
                          placeholder="What the photo shows"
                          className={inputClass}
                        />
                      </Field>
                    </div>

                    {active.cover && (
                      <img
                        src={active.cover}
                        alt=""
                        className="aspect-[16/9] w-full border border-line object-cover"
                      />
                    )}

                    {/* Dynamic Tags Management Section */}
                    <div className="flex flex-col gap-3">
                      <Label hint="Select or add custom tags">Tags</Label>
                      <div className="flex flex-wrap gap-2">
                        {allTags.map((tag) => {
                          const on = (active.tags || []).includes(tag)
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => toggleTag(tag)}
                              className={`rounded-full border px-3.5 py-1.5 text-[12px] font-medium uppercase tracking-[0.1em] transition-colors cursor-pointer ${
                                on
                                  ? 'border-green bg-green text-cream'
                                  : 'border-line text-ink-soft hover:border-green hover:text-green'
                              }`}
                            >
                              {tag}
                            </button>
                          )
                        })}
                      </div>

                      {/* Tag Creator Input */}
                      <form onSubmit={handleCreateTag} className="flex flex-wrap items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={newTagInput}
                          onChange={(e) => setNewTagInput(e.target.value)}
                          placeholder="Create custom tag..."
                          className="flex-1 min-w-[180px] rounded-lg border border-line bg-white px-3.5 py-2 text-[13px] text-ink outline-none focus:border-green"
                        />
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-green px-4 py-2 text-[12px] font-medium uppercase tracking-[0.1em] text-white hover:bg-green-deep transition-colors cursor-pointer"
                        >
                          <Plus className="h-4 w-4" /> Add Tag
                        </button>
                      </form>
                    </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Publish date" hint="A future date schedules it">
                    <input
                      type="date"
                      value={active.publishedAt}
                      onChange={(e) => patch({ publishedAt: e.target.value })}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Status">
                    <select
                      value={active.status}
                      onChange={(e) => patch({ status: e.target.value })}
                      className={inputClass}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </Field>
                </div>

                <BlockEditor body={active.body} onChange={(body) => patch({ body })} />

                <details className="border-t border-line pt-4">
                  <summary className="cursor-pointer text-[11px] font-medium uppercase tracking-[0.16em] text-ink-faint">
                    Search overrides
                  </summary>
                  <div className="mt-4 flex flex-col gap-6">
                    <Field label="Search title" hint="Falls back to the title">
                      <input
                        value={active.seoTitle}
                        onChange={(e) => patch({ seoTitle: e.target.value })}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Search description" hint="Falls back to the summary">
                      <textarea
                        value={active.seoDescription}
                        onChange={(e) => patch({ seoDescription: e.target.value })}
                        rows={2}
                        className={areaClass}
                      />
                    </Field>
                  </div>
                </details>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-6">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={removePost}
                      className="text-[12px] uppercase tracking-[0.12em] text-red-600 transition-opacity hover:opacity-80 font-medium cursor-pointer"
                    >
                      Delete post
                    </button>
                    <span className="text-slate-300">|</span>
                    <span className="text-[12px] uppercase tracking-[0.12em] text-slate-500">
                      {readingTime(active)} min read
                    </span>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={save}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-slate-700 px-4 py-2.5 text-[12px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-slate-800 rounded-lg cursor-pointer shadow-xs"
                    >
                      <Save className="h-4 w-4" />
                      Save Draft
                    </button>
                    <button
                      type="button"
                      onClick={publishPostLive}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-green px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-green-deep rounded-lg cursor-pointer shadow-sm"
                    >
                      <Globe className="h-4 w-4" />
                      Publish Live
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
    )}

        {toast && (
          <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 bg-charcoal px-5 py-3 text-[13px] text-cream shadow-lg">
            {toast}
          </div>
        )}
      </div>
    </>
  )
}
