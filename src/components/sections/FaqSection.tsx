type FaqItem = {
  q: string;
  a: string;
};

type FaqSectionProps = {
  items: FaqItem[];
};

/**
 * Renderuje sekcję FAQ na podstawie przekazanej listy pytań.
 *
 * @param props Właściwości komponentu FAQ.
 *
 * @author Mihu
 */
export default function FaqSection(props: FaqSectionProps) {
  return (
    <section id="faq" className="section-flow space-y-6 pt-8">
      <h2 className="section-title text-center">Najczęstsze pytania</h2>
      <div className="space-y-3">
        {props.items.map((item) => (
          <details key={item.q} className="faq-item card-luxe p-4">
            <summary className="flex items-center justify-between text-base text-white">
              <span>{item.q}</span>
              <span className="text-gold">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-[#bcc6d8]">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
