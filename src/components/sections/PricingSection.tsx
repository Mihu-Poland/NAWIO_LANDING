/**
 * Renderuje sekcję cennika na landingu.
 *
 * @author Mihu
 */
export default function PricingSection() {
  return (
    <section id="cennik" className="section-flow space-y-6 pt-8">
      <h2 className="section-title text-center">Cennik</h2>
      <div className="mx-auto max-w-3xl rounded-xl border border-(--card-border) bg-[oklch(0.2_0.025_260/0.65)] p-6 text-center">
        <p className="text-4xl font-semibold text-white">Beta: 0 PLN</p>
        <p className="mt-2 text-sm text-[#b9c5d8]">
          W czasie bety korzystasz bezpłatnie. Finalny cennik udostępnimy przed startem wersji produkcyjnej.
        </p>
      </div>
    </section>
  );
}
