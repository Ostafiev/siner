import { account } from "@/lib/orders";
import { UserIcon } from "./Icons";
import s from "./AccountBar.module.css";

/**
 * Плашка «кто вошёл» справа в строке крошек — она есть на всех экранах
 * кабинета. Данные пока демонстрационные: аккаунтов на сайте нет.
 */
export default function AccountBar() {
  return (
    <div className={s.bar}>
      <UserIcon className={s.icon} />
      <span className={s.name}>{account.name}</span>
      <span className={s.mail}>{account.email}</span>
    </div>
  );
}
