'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Plus, Search, Sparkles, Trash2 } from 'lucide-react';

type InsightRecord = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  author_role: string | null;
  image_url: string | null;
  og_image_url: string | null;
  website_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  canonical_url: string | null;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  published_at: string | null;
  updated_at: string;
};

type FormState = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  imageUrl: string;
  ogImageUrl: string;
  websiteUrl: string;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  publishedAt: string;
};

const emptyForm: FormState = {
  title: '',
  slug: '',
  category: '',
  excerpt: '',
  content: '',
  author: '',
  authorRole: '',
  imageUrl: '',
  ogImageUrl: '',
  websiteUrl: '',
  seoTitle: '',
  seoDescription: '',
  canonicalUrl: '',
  featured: false,
  status: 'draft',
  publishedAt: '',
};

function formatDate(value: string | null) {
  if (!value) return 'Not published';
  return new Date(value).toLocaleString();
}

function toFormState(item: InsightRecord): FormState {
  return {
    title: item.title,
    slug: item.slug,
    category: item.category,
    excerpt: item.excerpt,
    content: item.content,
    author: item.author,
    authorRole: item.author_role ?? '',
    imageUrl: item.image_url ?? '',
    ogImageUrl: item.og_image_url ?? '',
    websiteUrl: item.website_url ?? '',
    seoTitle: item.seo_title ?? '',
    seoDescription: item.seo_description ?? '',
    canonicalUrl: item.canonical_url ?? '',
    featured: item.featured,
    status: item.status,
    publishedAt: item.published_at ? item.published_at.slice(0, 16) : '',
  };
}

export default function InsightsManager({ data }: { data: InsightRecord[] }) {
  const router = useRouter();
  const [items, setItems] = useState(data);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | InsightRecord['status']>('all');
  const [editorId, setEditorId] = useState<string | 'new' | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const filteredItems = items.filter((item) => {
    const matchesQuery =
      !query ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.slug.toLowerCase().includes(query.toLowerCase()) ||
      item.author.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  function openNew() {
    setEditorId('new');
    setForm(emptyForm);
    setError(null);
  }

  function openEdit(item: InsightRecord) {
    setEditorId(item.id);
    setForm(toFormState(item));
    setError(null);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);

    const isNew = editorId === 'new';
    const endpoint = isNew ? '/api/admin/insights' : `/api/admin/insights/${editorId}`;
    const method = isNew ? 'POST' : 'PATCH';

    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      setError(payload.error ?? 'Unable to save insight.');
      setSaving(false);
      return;
    }

    router.refresh();
    setEditorId(null);
    setForm(emptyForm);
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Delete this insight permanently?')) return;

    const response = await fetch(`/api/admin/insights/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      setError(payload.error ?? 'Unable to delete insight.');
      return;
    }

    setItems((current) => current.filter((item) => item.id !== id));
    if (editorId === id) {
      setEditorId(null);
      setForm(emptyForm);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Editorial CMS</p>
            <h1 className="mt-2 text-3xl font-bold text-gray-950">Insights Management</h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              Manage drafts, metadata, publishing states, and featured placement from one workflow.
            </p>
          </div>
          <button
            onClick={openNew}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" />
            New Insight
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_180px]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title, slug, or author"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:bg-white"
            />
          </label>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as 'all' | InsightRecord['status'])}
            className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white"
          >
            <option value="all">All statuses</option>
            <option value="draft">Drafts</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['Title', 'Status', 'Category', 'Published', 'Updated', 'Actions'].map((header) => (
                    <th
                      key={header}
                      className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-gray-500"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="align-top hover:bg-gray-50/70">
                    <td className="px-5 py-4">
                      <button onClick={() => openEdit(item)} className="text-left">
                        <div className="font-semibold text-gray-950">{item.title}</div>
                        <div className="mt-1 text-xs text-gray-500">{item.slug}</div>
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-gray-700">
                        {item.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-700">{item.category}</td>
                    <td className="px-5 py-4 text-sm text-gray-700">{formatDate(item.published_at)}</td>
                    <td className="px-5 py-4 text-sm text-gray-700">{formatDate(item.updated_at)}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(item)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-primary hover:text-primary"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-red-600 transition hover:border-red-200 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-sm text-gray-500">
                      No insights match your current filters.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                {editorId === 'new' ? 'Create Insight' : editorId ? 'Edit Insight' : 'Editor'}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-gray-950">
                {editorId ? 'Content, metadata, and publishing' : 'Select an article to edit'}
              </h2>
            </div>
            <Sparkles className="h-6 w-6 text-primary" />
          </div>

          {editorId ? (
            <div className="mt-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input className="rounded-2xl border border-gray-200 px-4 py-3 text-sm" placeholder="Title" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} />
                <input className="rounded-2xl border border-gray-200 px-4 py-3 text-sm" placeholder="Slug" value={form.slug} onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <input className="rounded-2xl border border-gray-200 px-4 py-3 text-sm" placeholder="Category" value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} />
                <input className="rounded-2xl border border-gray-200 px-4 py-3 text-sm" placeholder="Author" value={form.author} onChange={(event) => setForm((current) => ({ ...current, author: event.target.value }))} />
              </div>
              <input className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm" placeholder="Author role" value={form.authorRole} onChange={(event) => setForm((current) => ({ ...current, authorRole: event.target.value }))} />
              <textarea className="min-h-24 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm" placeholder="Excerpt" value={form.excerpt} onChange={(event) => setForm((current) => ({ ...current, excerpt: event.target.value }))} />
              <textarea className="min-h-56 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm" placeholder="Plain-text article content" value={form.content} onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))} />
              <div className="grid gap-4 md:grid-cols-2">
                <input className="rounded-2xl border border-gray-200 px-4 py-3 text-sm" placeholder="Hero image URL" value={form.imageUrl} onChange={(event) => setForm((current) => ({ ...current, imageUrl: event.target.value }))} />
                <input className="rounded-2xl border border-gray-200 px-4 py-3 text-sm" placeholder="OG image URL" value={form.ogImageUrl} onChange={(event) => setForm((current) => ({ ...current, ogImageUrl: event.target.value }))} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <input className="rounded-2xl border border-gray-200 px-4 py-3 text-sm" placeholder="Website URL" value={form.websiteUrl} onChange={(event) => setForm((current) => ({ ...current, websiteUrl: event.target.value }))} />
                <input className="rounded-2xl border border-gray-200 px-4 py-3 text-sm" placeholder="Canonical override" value={form.canonicalUrl} onChange={(event) => setForm((current) => ({ ...current, canonicalUrl: event.target.value }))} />
              </div>
              <input className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm" placeholder="SEO title" value={form.seoTitle} onChange={(event) => setForm((current) => ({ ...current, seoTitle: event.target.value }))} />
              <textarea className="min-h-24 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm" placeholder="SEO description" value={form.seoDescription} onChange={(event) => setForm((current) => ({ ...current, seoDescription: event.target.value }))} />
              <div className="grid gap-4 md:grid-cols-2">
                <select className="rounded-2xl border border-gray-200 px-4 py-3 text-sm" value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as FormState['status'] }))}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
                <input className="rounded-2xl border border-gray-200 px-4 py-3 text-sm" type="datetime-local" value={form.publishedAt} onChange={(event) => setForm((current) => ({ ...current, publishedAt: event.target.value }))} />
              </div>
              <label className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-700">
                <input type="checkbox" checked={form.featured} onChange={(event) => setForm((current) => ({ ...current, featured: event.target.checked }))} />
                Feature this insight on the public page
              </label>

              {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:opacity-60"
                >
                  {saving ? 'Saving...' : editorId === 'new' ? 'Create insight' : 'Save changes'}
                </button>
                <button
                  onClick={() => {
                    setEditorId(null);
                    setForm(emptyForm);
                    setError(null);
                  }}
                  className="rounded-full border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-primary hover:text-primary"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-6 text-sm leading-7 text-gray-600">
              Open an existing insight or create a new one to manage metadata, publishing status, and search fields.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
