import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>HuyHoang</div>
      <div className={styles.text}>
        HuyHoang copy thoughts agency © All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
