import { motion } from "framer-motion";
import "../styles/components/countries.scss";

const countries = [
  { name: "Kenya", flag: "🇰🇪" },
  { name: "Ethiopia", flag: "🇪🇹" },
  { name: "Ghana", flag: "🇬🇭" },
  { name: "Uganda", flag: "🇺🇬" },
];

export const Countries = () => {
  return (
    <section id="countries">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="badge">Live now</span>
          <h2>Available in 4 countries</h2>
          <p>More coming soon</p>
        </motion.div>

        <div className="countries-row">
          {countries.map((c, i) => (
            <motion.div
              key={c.name}
              className="country"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="flag">{c.flag}</span>
              <span className="name">{c.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
