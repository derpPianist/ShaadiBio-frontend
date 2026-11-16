import type { BiodataView } from "../../types";
import styles from "./floral.module.css";

export default function Floral({ data }: { data: BiodataView }) {
  return (
    <div className={styles.sheet}>
      <div className={styles.frame}>
        <span className={`${styles.corner} ${styles.tl}`}>❁</span>
        <span className={`${styles.corner} ${styles.tr}`}>❁</span>
        <span className={`${styles.corner} ${styles.bl}`}>❁</span>
        <span className={`${styles.corner} ${styles.br}`}>❁</span>

        <header className={styles.header}>
          <p className={styles.kicker}>❀ Marriage Biodata ❀</p>
          {data.photoUrl && <img className={styles.photo} src={data.photoUrl} alt={data.name} />}
          <h1 className={styles.name}>{data.name}</h1>
        </header>

        {data.sections.map((section) => (
          <section key={section.id} className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span>{section.title}</span>
            </h2>
            <dl className={styles.list}>
              {section.fields.map((f) => (
                <div key={f.key} className={styles.row}>
                  <dt className={styles.label}>{f.label}</dt>
                  <dd className={styles.value}>{f.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}