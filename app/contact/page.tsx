import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div>
        <h1 className="text-2xl font-bold">Contact</h1>
        <p className="mt-2 text-slate-600">Quick demo form page.</p>
      </div>

      <form className="space-y-4" aria-label="Contact form">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-slate-300 focus:ring"
            placeholder="Jane Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-slate-300 focus:ring"
            placeholder="jane@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-slate-300 focus:ring"
            placeholder="How can we help?"
          />
        </div>

        <button
          type="button"
          className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-700"
        >
          Send
        </button>
      </form>

      <p className="text-sm text-slate-500">
        Want to explore products instead?{" "}
        <Link href="/products" className="underline">
          Go to products
        </Link>
      </p>
    </div>
  );
}
