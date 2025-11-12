interface CardProps {
  img?: string;
  icon?: string;
  body: string;
  footer: string;
  btn?: string;
}

export default function Card({ img, icon, body, footer, btn }: CardProps) {
  const hasImg = !!img;
  const hasIcon = !!icon;
  const hasBtn = !!btn;

  return (
    <div className="bg-(--bg) hover:bg-(--bg-light) p-8 rounded-3xl shadow-sl overflow-hidden transition-all duration-300 hover:-translate-y-2 border border-(--bg-lighter)">
      {hasImg && (
        <div className="flex justify-center w-full">
          <img
            className={`h-56 aspect-video object-cover shadow-l rounded-3xl mb-4`}
            src={img}
            alt="Card"
          />
        </div>
      )}
      {hasIcon && (
        <div
          className={`flex items-center justify-center w-24 h-24 mx-auto rounded-full shadow-l bg-(--bg-lighter) mb-4`}
        >
          <div className="icon text-(--text) text-4xl">
            <i className={icon} />
          </div>
        </div>
      )}
      <div>
        <h4
          className={`text-(--text) mb-2`}
          dangerouslySetInnerHTML={{ __html: body }}
        />
        {hasBtn && (
          <div className="mt-10" dangerouslySetInnerHTML={{ __html: btn }} />
        )}
        <p
          className="text-(--text-muted)"
          dangerouslySetInnerHTML={{ __html: footer }}
        />
      </div>
    </div>
  );
}
