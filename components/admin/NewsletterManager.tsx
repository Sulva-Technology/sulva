'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Search } from 'lucide-react';

type SubscriberRecord = {
  id: string;
  created_at: string;
  updated_at: string;
  email: string;
  notes: string | null;
};

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

export default function NewsletterManager({ data }: { data: SubscriberRecord[] }) {
  const router = useRouter();
  const [items, setItems] = useState(data);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(data[0]?.id ?? null);
  const [notesDraft, setNotesDraft] = useState<string>(data[0]?.notes ?? '');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const filteredItems = items.filter((item) => !query || item.email.toLowerCase().includes(query.toLowerCase()));
  const selectedSubscriber =
    filteredItems.find((item) => item.id === selectedId) ??
    items.find((item) => item.id === selectedId) ??
    null;

  function selectSubscriber(id: string) {
    const item = items.find((entry) => entry.id === id);
    setSelectedId(id);
    setNotesDraft(item?.notes ?? '');
    setFeedback(null);
  }

  async function saveNotes() {
    if (!selectedSubscriber) return;

    setSaving(true);
    setFeedback(null);
    const response = await fetch(`/api/admin/subscribers/${selectedSubscriber.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ notes: notesDraft }),
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      setFeedback(payload.error ?? 'Unable to save subscriber notes.');
      setSaving(false);
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item.id === selectedSubscriber.id
          ? { ...item, notes: notesDraft, updated_at: new Date().toISOString() }
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
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Audience List</p>
            <h1 className="mt-2 text-3xl font-bold text-gray-950">Newsletter Subscribers</h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              Export your list and keep lightweight internal notes for partnerships or audience segmentation.
            </p>
          </div>
          <button
            onClick={() => {
              window.location.href = '/api/admin/subscribers/export';
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-800 transition-colors hover:border-primary hover:text-primary"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>

        <label className="relative mt-6 block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search subscribers by email"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:bg-white"
          />
        </label>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="divide-y divide-gray-100">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => selectSubscriber(item.id)}
                className={`w-full px-5 py-4 text-left transition ${selectedId === item.id ? 'bg-primary/5' : 'hover:bg-gray-50'}`}
              >
                <div className="font-semibold text-gray-950">{item.email}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.15em] text-gray-500">
                  Added {formatDate(item.created_at)}
                </div>
              </button>
            ))}
            {filteredItems.length === 0 ? (
              <div className="px-5 py-12 text-center text-sm text-gray-500">
                No subscribers match that query.
              </div>
            ) : null}
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          {selectedSubscriber ? (
            <div className="space-y-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Subscriber Detail</p>
                <h2 className="mt-2 text-xl font-bold text-gray-950">{selectedSubscriber.email}</h2>
                <p className="mt-1 text-sm text-gray-600">
                  Added {formatDate(selectedSubscriber.created_at)} and last updated {formatDate(selectedSubscriber.updated_at)}.
                </p>
              </div>

              <textarea
                value={notesDraft}
                onChange={(event) => setNotesDraft(event.target.value)}
                placeholder="Internal notes for this subscriber"
                className="min-h-48 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm"
              />

              {feedback ? (
                <p className={`text-sm font-medium ${feedback === 'Saved.' ? 'text-green-600' : 'text-red-600'}`}>
                  {feedback}
                </p>
              ) : null}

              <button
                onClick={saveNotes}
                disabled={saving}
                className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:opacity-60"
              >
                {saving ? 'Saving...' : 'Save subscriber note'}
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-600">Select a subscriber to manage notes.</p>
          )}
        </div>
      </div>
    </div>
  );
}
