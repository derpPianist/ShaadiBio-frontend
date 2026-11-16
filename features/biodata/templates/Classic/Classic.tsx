import type { BiodataView } from "../../types";
import styles from "./classic.module.css";

export default function Classic({ data }: { data: BiodataView }) {
  return (
    <div className={styles.sheet}>
      <div className={styles.frame}>
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>Marriage Biodata</p>
            <h1 className={styles.name}>{data.name}</h1>
          </div>
          {data.photoUrl && (
            // plain <img> on purpose: simplest for printing, no next/image config needed
            <img className={styles.photo} src={data.photoUrl} alt={data.name} />
          )}
        </header>

        {data.sections.map((section) => (
          <section key={section.id} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
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