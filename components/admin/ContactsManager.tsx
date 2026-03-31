'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Search } from 'lucide-react';

type ContactRecord = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  company: string | null;
  projectType: string | null;
  budget: string | null;
  message: string;
  status: 'new' | 'in_review' | 'replied' | 'qualified' | 'closed';
  notes: string | null;
};

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

export default function ContactsManager({ data }: { data: ContactRecord[] }) {
  const router = useRouter();
  const [items, setItems] = useState(data);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ContactRecord['status']>('all');
  const [selectedId, setSelectedId] = useState<string | null>(data[0]?.id ?? null);
  const [notesDraft, setNotesDraft] = useState<string>(data[0]?.notes ?? '');
  const [statusDraft, setStatusDraft] = useState<ContactRecord['status']>(data[0]?.status ?? 'new');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const filteredItems = items.filter((item) => {
    const haystack = `${item.name} ${item.email} ${item.company ?? ''} ${item.message}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const selectedContact =
    filteredItems.find((item) => item.id === selectedId) ??
    items.find((item) => item.id === selectedId) ??
    null;

  function selectContact(id: string) {
    const contact = items.find((item) => item.id === id);
    setSelectedId(id);
    setNotesDraft(contact?.notes ?? '');
    setStatusDraft(contact?.status ?? 'new');
    setFeedback(null);
  }

  async function saveContact() {
    if (!selectedContact) return;

    setSaving(true);
    setFeedback(null);
    const response = await fetch(`/api/admin/contacts/${selectedContact.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: statusDraft,
        notes: notesDraft,
      }),
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      setFeedback(payload.error ?? 'Unable to save contact changes.');
      setSaving(false);
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item.id === selectedContact.id
          ? { ...item, status: statusDraft, notes: notesDraft, updated_at: new Date().toISOString() }
          : item
      )
    );
    setFeedback('Saved.');
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">CRM Workflow</p>
            <h1 className="mt-2 text-3xl font-bold text-gray-950">Contacts Pipeline</h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              Qualify leads, capture follow-up notes, and export your contact pipeline for handoff or reporting.
            </p>
          </div>
          <button
            onClick={() => {
              window.location.href = '/api/admin/contacts/export';
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-800 transition-colors hover:border-primary hover:text-primary"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_180px]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name, email, company, or message"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:bg-white"
            />
          </label>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as 'all' | ContactRecord['status'])}
            className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white"
          >
            <option value="all">All statuses</option>
            <option value="new">New</option>
            <option value="in_review">In review</option>
            <option value="replied">Replied</option>
            <option value="qualified">Qualified</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => selectContact(item.id)}
              className={`w-full rounded-3xl border p-5 text-left shadow-sm transition ${
                selectedId === item.id ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white hover:border-primary/40'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-gray-950">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.email}</p>
                </div>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-gray-700">
                  {item.status}
                </span>
              </div>
              <p className="mt-3 line-clamp-2 text-sm text-gray-600">{item.message}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-xs uppercase tracking-[0.15em] text-gray-500">
                <span>{item.company || 'Independent'}</span>
                <span>{item.projectType || 'General enquiry'}</span>
                <span>{formatDate(item.created_at)}</span>
              </div>
            </button>
          ))}

          {filteredItems.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">
              No contacts match the current filters.
            </div>
          ) : null}
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          {selectedContact ? (
            <div className="space-y-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Lead Detail</p>
                <h2 className="mt-2 text-2xl font-bold text-gray-950">{selectedContact.name}</h2>
                <p className="mt-1 text-sm text-gray-600">{selectedContact.email}</p>
              </div>

              <div className="grid gap-3 text-sm text-gray-700">
                <div className="rounded-2xl bg-gray-50 p-4"><strong>Company:</strong> {selectedContact.company || 'Not provided'}</div>
                <div className="rounded-2xl bg-gray-50 p-4"><strong>Project type:</strong> {selectedContact.projectType || 'Not specified'}</div>
                <div className="rounded-2xl bg-gray-50 p-4"><strong>Budget:</strong> {selectedContact.budget || 'Not specified'}</div>
                <div className="rounded-2xl bg-gray-50 p-4"><strong>Last updated:</strong> {formatDate(selectedContact.updated_at)}</div>
              </div>

              <div className="rounded-2xl border border-gray-200 p-4 text-sm leading-7 text-gray-700">
                {selectedContact.message}
              </div>

              <select
                value={statusDraft}
                onChange={(event) => setStatusDraft(event.target.value as ContactRecord['status'])}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm"
              >
                <option value="new">New</option>
                <option value="in_review">In review</option>
                <option value="replied">Replied</option>
                <option value="qualified">Qualified</option>
                <option value="closed">Closed</option>
              </select>

              <textarea
                value={notesDraft}
                onChange={(event) => setNotesDraft(event.target.value)}
                placeholder="Internal notes, follow-up details, or qualification context"
                className="min-h-40 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm"
              />

              {feedback ? (
                <p className={`text-sm font-medium ${feedback === 'Saved.' ? 'text-green-600' : 'text-red-600'}`}>
                  {feedback}
                </p>
              ) : null}

              <button
                onClick={saveContact}
                disabled={saving}
                className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:opacity-60"
              >
                {saving ? 'Saving...' : 'Save lead update'}
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-600">Select a contact to review its lead details and notes.</p>
          )}
        </div>
      </div>
    </div>
  );
}
