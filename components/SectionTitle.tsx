import s from "./SectionTitle.module.css";

/** Заголовок секции: золотая надпись поверх огромной «тиснёной» копии слова. */
export default function SectionTitle({
  children,
  action,
}: {
  children: string;
  action?: React.ReactNode;
}) {
  return (
    <div className={s.wrap}>
      <span className={s.ghost} aria-hidden="true">
        {children}
      </span>
      <h2 className={`${s.title} gold-text`}>{children}</h2>
      {action ? <div className={s.action}>{action}</div> : null}
    </div>
  );
}
