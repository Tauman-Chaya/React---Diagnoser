import React, { useState, useRef, useEffect } from 'react';
import styles from './BotSidebar.module.css';
import { MessageSquare, X, Search, User } from 'lucide-react';
import WorkshopAI from '../../features/AI/WorkshopAI';

export default function BotSidebar() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(v => !v);
  const inputRef = useRef(null);
  const [selectedMode, setSelectedMode] = useState(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  return (
    <div className={`${styles.container} ${open ? styles.open : ''}`}>
      <div className={styles.button} onClick={toggle} aria-label="Toggle bot">
        {open ? <X size={18} /> : <MessageSquare size={18} />}
      </div>

      <div className={styles.panel} role="dialog" aria-hidden={!open}>
        <div className={styles.header}>
          {/* <h4> בוט אישי לחיפוש מהיר</h4> */}
          <p className={styles.lead}>!!שלום</p>
          <p className={styles.lead}>אני הבוט האישי שלך</p>
          <p className={styles.lead}>אני כאן לעזור לך למצוא סדנה או מאבחנת במהירות</p>
          <div className={styles.modeLabel} aria-hidden={false}> בחרו בחיפוש בו אתם מעונינים  </div>
          <div className={styles.modeButtons}>
            <button
              className={`${styles.modeBtn} ${styles.modeBtnWorkshop}`}
              onClick={() => {
                setSelectedMode('workshop');
                setOpen(true);
              }}
              aria-label="בחר סדנה"
            >
              <span className={styles.btnIcon}><Search size={16} /></span>
              <span className={styles.btnLabel}>סדנה</span>
            </button>

            <button
              className={`${styles.modeBtn} ${styles.modeBtnDiagnoser}`}
              onClick={() => {
                setSelectedMode('diagnoser');
                setOpen(true);
              }}
              aria-label="בחר מאבחנת"
            >
              <span className={styles.btnIcon}><User size={16} /></span>
              <span className={styles.btnLabel}>מאבחנת</span>
            </button>
          </div>
          <button className={styles.close} onClick={toggle}><X size={16} /></button>
        </div>
        <div className={styles.body}>
          {/* Render existing AI bot component from features/AI, pass ref and open state */}
          <WorkshopAI sidebarOpen={open} sidebarInputRef={inputRef} externalMode={selectedMode} />
        </div>
      </div>
    </div>
  );
}
