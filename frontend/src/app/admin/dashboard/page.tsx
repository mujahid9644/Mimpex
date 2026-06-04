"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Activity, Bot, Boxes, CircleDollarSign, FlaskConical, MapPinned, Plus, RefreshCw, Store, Trash2 } from "lucide-react";

import { adminApi, type AdminProduct, type DashboardStats, type DiagnosticHeatmapRow, type DiagnosticLogRow } from "@/lib/admin-api";

type ProductForm = {
  matrix_id: string;
  name_bn: string;
  name_en: string;
  formulation: string;
  active_chemical: string;
  pack_size: string;
  unit_price_bdt: number;
  product_type: string;
  stock_quantity: number;
  stock_status: string;
  crop_targets: string;
};

const DEMO_HEATMAP: DiagnosticHeatmapRow[] = [
  { region: "রাজশাহী", disease: "আম এনথ্রাকনোজ", intensity: 84, cases: 132 },
  { region: "রংপুর", disease: "আলু লেট ব্লাইট", intensity: 72, cases: 96 },
  { region: "যশোর", disease: "সবজি ফল ছিদ্রকারী", intensity: 64, cases: 81 },
  { region: "বরিশাল", disease: "ধান ব্লাস্ট", intensity: 58, cases: 69 },
  { region: "সিলেট", disease: "চা আগাছা", intensity: 42, cases: 37 },
];

const DEMO_STATS: DashboardStats = {
  total_sales_bdt: 12450000,
  active_dealers: 248,
  crops_diagnosed_ai: 1736,
  products_in_catalog: 24,
  stock_summary: { in_stock: 19, low_stock: 4, out_of_stock: 1 },
  revenue_delta_percent: 18.4,
  dealer_delta_percent: 7.8,
  diagnostic_heatmap: DEMO_HEATMAP,
};

const initialForm: ProductForm = {
  matrix_id: "",
  name_bn: "",
  name_en: "",
  formulation: "",
  active_chemical: "",
  pack_size: "100 ml",
  unit_price_bdt: 0,
  product_type: "pgr",
  stock_quantity: 100,
  stock_status: "in_stock",
  crop_targets: "",
};

function formatBdt(value: number) {
  return new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT", maximumFractionDigits: 0 }).format(value);
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>(DEMO_STATS);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [logs, setLogs] = useState<DiagnosticLogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<ProductForm>(initialForm);

  const heatmap = stats.diagnostic_heatmap?.length ? stats.diagnostic_heatmap : DEMO_HEATMAP;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [nextStats, nextProducts, nextLogs] = await Promise.all([adminApi.stats(), adminApi.products(), adminApi.diagnostics()]);
      setStats({ ...DEMO_STATS, ...nextStats });
      setProducts(nextProducts);
      setLogs(nextLogs);
    } catch {
      setStats(DEMO_STATS);
      setProducts([]);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const cards = useMemo(
    () => [
      {
        label: "Total Platform Revenue",
        value: formatBdt(stats.total_sales_bdt),
        meta: `+${stats.revenue_delta_percent ?? 0}% QoQ`,
        icon: CircleDollarSign,
        className: "bg-emerald-700",
      },
      {
        label: "Active Dealers",
        value: stats.active_dealers.toString(),
        meta: `+${stats.dealer_delta_percent ?? 0}% network growth`,
        icon: Store,
        className: "bg-cyan-700",
      },
      {
        label: "AI Diagnostics",
        value: stats.crops_diagnosed_ai.toString(),
        meta: "Gemini Vision sessions",
        icon: Bot,
        className: "bg-red-700",
      },
      {
        label: "Catalog SKUs",
        value: stats.products_in_catalog.toString(),
        meta: `${stats.stock_summary.low_stock} low stock alerts`,
        icon: Boxes,
        className: "bg-slate-800",
      },
    ],
    [stats]
  );

  async function addProduct() {
    if (!form.matrix_id || !form.name_bn) return;
    await adminApi.createProduct({
      ...form,
      crop_targets: form.crop_targets
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    });
    setForm(initialForm);
    load();
  }

  async function updateProduct(matrixId: string, body: Partial<AdminProduct>) {
    await adminApi.updateProduct(matrixId, body);
    load();
  }

  async function removeProduct(matrixId: string) {
    if (!confirm(`Delete ${matrixId}?`)) return;
    await adminApi.deleteProduct(matrixId);
    load();
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">Enterprise Control Room</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">Mimpex Agro-Analytics Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Revenue, dealers, AI diagnostics, formulation, pricing and stock operations.</p>
        </div>
        <button
          type="button"
          onClick={load}
          className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <article key={card.label} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className={`${card.className} p-5 text-white`}>
              <card.icon className="h-7 w-7" />
              <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-white/75">{card.label}</p>
              <p className="mt-2 text-3xl font-black">{card.value}</p>
            </div>
            <p className="px-5 py-3 text-sm font-bold text-slate-600">{card.meta}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 text-xl font-black text-slate-950">
            <MapPinned className="h-5 w-5 text-red-700" />
            AI Diagnostic Disease Heatmap
          </h2>
          <div className="mt-6 space-y-4">
            {heatmap.map((row) => (
              <div key={row.region}>
                <div className="flex items-center justify-between text-sm font-bold">
                  <span>{row.region} · {row.disease}</span>
                  <span>{row.cases} cases</span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-red-600" style={{ width: `${row.intensity}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 text-xl font-black text-slate-950">
            <Activity className="h-5 w-5 text-emerald-700" />
            Stock Status Indicators
          </h2>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { label: "In Stock", value: stats.stock_summary.in_stock, className: "bg-emerald-50 text-emerald-800" },
              { label: "Low", value: stats.stock_summary.low_stock, className: "bg-amber-50 text-amber-800" },
              { label: "Out", value: stats.stock_summary.out_of_stock, className: "bg-red-50 text-red-800" },
            ].map((item) => (
              <div key={item.label} className={`rounded-lg p-4 text-center ${item.className}`}>
                <p className="text-3xl font-black">{item.value}</p>
                <p className="mt-1 text-xs font-black uppercase">{item.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <h2 className="flex items-center gap-2 text-xl font-black text-slate-950">
            <FlaskConical className="h-5 w-5 text-emerald-700" />
            Product Pricing, Formulation & Stock CRUD
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <input className="input-pro" placeholder="Matrix ID" value={form.matrix_id} onChange={(event) => setForm({ ...form, matrix_id: event.target.value })} />
            <input className="input-pro" placeholder="Name BN" value={form.name_bn} onChange={(event) => setForm({ ...form, name_bn: event.target.value })} />
            <input className="input-pro" placeholder="Active chemical" value={form.active_chemical} onChange={(event) => setForm({ ...form, active_chemical: event.target.value })} />
            <input className="input-pro" placeholder="Pack size" value={form.pack_size} onChange={(event) => setForm({ ...form, pack_size: event.target.value })} />
            <input className="input-pro" type="number" placeholder="Price BDT" value={form.unit_price_bdt} onChange={(event) => setForm({ ...form, unit_price_bdt: Number(event.target.value) })} />
            <input className="input-pro" placeholder="Formulation" value={form.formulation} onChange={(event) => setForm({ ...form, formulation: event.target.value })} />
            <input className="input-pro" placeholder="Crop targets comma separated" value={form.crop_targets} onChange={(event) => setForm({ ...form, crop_targets: event.target.value })} />
            <select className="input-pro" value={form.product_type} onChange={(event) => setForm({ ...form, product_type: event.target.value })}>
              <option value="pgr">PGR</option>
              <option value="insecticide">Insecticide</option>
              <option value="fungicide">Fungicide</option>
              <option value="herbicide">Herbicide</option>
              <option value="aquaculture">Aquaculture</option>
            </select>
            <input className="input-pro" type="number" value={form.stock_quantity} onChange={(event) => setForm({ ...form, stock_quantity: Number(event.target.value) })} />
            <button type="button" onClick={addProduct} className="inline-flex items-center justify-center gap-2 rounded-md bg-red-700 px-4 py-3 text-sm font-black text-white hover:bg-red-800">
              <Plus className="h-4 w-4" />
              Add SKU
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Active Chemical</th>
                <th className="px-4 py-3">Pack</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.matrix_id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-mono text-xs">{product.matrix_id}</td>
                  <td className="px-4 py-3 font-bold">{product.name_bn || product.name_en}</td>
                  <td className="px-4 py-3">{product.active_chemical || product.formulation}</td>
                  <td className="px-4 py-3">{product.pack_size || "N/A"}</td>
                  <td className="px-4 py-3">{formatBdt(product.unit_price_bdt || 0)}</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      className="w-20 rounded-md border border-slate-200 px-2 py-1"
                      defaultValue={product.stock_quantity}
                      onBlur={(event) => updateProduct(product.matrix_id, { stock_quantity: Number(event.target.value) })}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <select
                      className="rounded-md border border-slate-200 px-2 py-1 text-xs"
                      value={product.stock_status}
                      onChange={(event) => updateProduct(product.matrix_id, { stock_status: event.target.value })}
                    >
                      <option value="in_stock">In Stock</option>
                      <option value="low_stock">Low</option>
                      <option value="out_of_stock">Out</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button type="button" onClick={() => removeProduct(product.matrix_id)} className="text-red-600 hover:text-red-800">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <h2 className="text-xl font-black text-slate-950">Recent AI Diagnostic JSON Logs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Crop</th>
                <th className="px-4 py-3">Disease</th>
                <th className="px-4 py-3">Product ID</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                    No diagnostics yet. ImageBot submissions will appear here.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="border-t border-slate-100">
                    <td className="px-4 py-3">{log.id}</td>
                    <td className="px-4 py-3">{log.crop_type || "N/A"}</td>
                    <td className="max-w-xs truncate px-4 py-3">{log.condition || "N/A"}</td>
                    <td className="px-4 py-3 font-mono text-xs">{log.matched_product_id}</td>
                    <td className="px-4 py-3 text-slate-500">{new Date(log.created_at).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
