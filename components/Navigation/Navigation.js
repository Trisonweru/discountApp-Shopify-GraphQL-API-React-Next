import { useRouter } from "next/dist/client/router";
import React from "react";
import Link from "next/link";
import styles from "./Navigation.module.css";

function Navigation() {
  const router = useRouter();
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.navWrapper}>
        <ul>
          <li
            className={
              router.pathname === "/"
                ? styles.list_item_active
                : styles.list_item
            }
          >
            <Link href="/">Discount Code</Link>
          </li>
          <li
            className={
              router.pathname === "/reports"
                ? styles.list_report_active
                : styles.list_report
            }
          >
            <Link href="/reports">Reports</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Navigation;
