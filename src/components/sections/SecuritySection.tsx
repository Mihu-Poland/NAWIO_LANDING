import { BadgeCheck, Scale, ShieldCheck } from "lucide-react";

/**
 * Renderuje sekcję bezpieczeństwa i zgodności.
 *
 * @author Mihu
 */
export default function SecuritySection() {
  return (
    <section className="section-flow space-y-4 pt-8">
      <h2 className="section-title text-center">Bezpieczeństwo i zgodność</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <article className="card-luxe p-4 text-center">
          <div className="mx-auto grid h-10 w-10 place-items-center rounded-md border border-(--gold)/55 bg-(--gold-soft) text-gold">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="mt-2 text-[20px] font-semibold text-white">Dane w UE</h3>
          <p className="mt-2 text-sm text-[#bcc6d8]">Infrastruktura Supabase, serwery w Europie</p>
        </article>
        <article className="card-luxe p-4 text-center">
          <div className="mx-auto grid h-10 w-10 place-items-center rounded-md border border-(--gold)/55 bg-(--gold-soft) text-gold">
            <BadgeCheck className="h-5 w-5" />
          </div>
          <h3 className="mt-2 text-[20px] font-semibold text-white">RODO</h3>
          <p className="mt-2 text-sm text-[#bcc6d8]">Przetwarzamy tylko dane niezbędne do działania aplikacji</p>
        </article>
        <article className="card-luxe p-4 text-center">
          <div className="mx-auto grid h-10 w-10 place-items-center rounded-md border border-(--gold)/55 bg-(--gold-soft) text-gold">
            <Scale className="h-5 w-5" />
          </div>
          <h3 className="mt-2 text-[20px] font-semibold text-white">Audyt prawny</h3>
          <p className="mt-2 text-sm text-[#bcc6d8]">Szablony dokumentów weryfikowane przez kancelarię prawną</p>
        </article>
      </div>
    </section>
  );
}
