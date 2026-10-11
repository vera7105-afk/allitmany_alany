'use client';

import React, { useState } from 'react';
import { X, BookOpen, AlertCircle, CheckCircle, HelpCircle } from '@/components/Icons';
import { GRAMMAR_THEORY } from '@/data/grammarRules';
import { soundManager } from '@/utils/soundEffects';

interface GrammarHandbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GrammarHandbookModal: React.FC<GrammarHandbookModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'allitmany' | 'alany' | 'csapdak' | 'egyeztetes'>('allitmany');

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container handbook-modal" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-badge">
              <BookOpen size={24} />
            </div>
            <div>
              <h2 className="modal-title">Nyelvtani Kisokos (7. Osztály)</h2>
              <p className="modal-subtitle">Minden fontos szabály, aláhúzás és csapda egy helyen</p>
            </div>
          </div>
          <button
            className="modal-close-btn"
            onClick={() => { soundManager.playClick(); onClose(); }}
            title="Bezárás"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="handbook-tabs">
          <button
            className={`tab-btn ${activeTab === 'allitmany' ? 'active' : ''}`}
            onClick={() => { soundManager.playClick(); setActiveTab('allitmany'); }}
          >
            <span className="tab-pill-icon">══</span>
            <span>1. Az Állítmány</span>
          </button>

          <button
            className={`tab-btn ${activeTab === 'alany' ? 'active' : ''}`}
            onClick={() => { soundManager.playClick(); setActiveTab('alany'); }}
          >
            <span className="tab-pill-icon">──</span>
            <span>2. Az Alany</span>
          </button>

          <button
            className={`tab-btn tab-warning ${activeTab === 'csapdak' ? 'active' : ''}`}
            onClick={() => { soundManager.playClick(); setActiveTab('csapdak'); }}
          >
            <span className="tab-pill-icon">⚠️</span>
            <span>3. Igenévi Csapda!</span>
          </button>

          <button
            className={`tab-btn ${activeTab === 'egyeztetes' ? 'active' : ''}`}
            onClick={() => { soundManager.playClick(); setActiveTab('egyeztetes'); }}
          >
            <span className="tab-pill-icon">⚖️</span>
            <span>4. Egyeztetés</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="handbook-content">
          {activeTab === 'allitmany' && (
            <div className="handbook-section">
              <div className="theory-hero-card hero-predicate">
                <div className="hero-badge">Jelölés: Két párhuzamos vonal ( ══ )</div>
                <h3>Mit fejez ki az állítmány?</h3>
                <p>
                  A mondat legfontosabb, központi tagja. Minden más mondatrész hozzá kapcsolódik.
                  Az állítmány az a mondatrész, <strong>AMELLYEL állítunk valamit</strong>.
                </p>
                <div className="hero-question">
                  <HelpCircle size={18} />
                  <span>Főkérdése: <strong>Mit állítunk?</strong></span>
                </div>
              </div>

              <div className="theory-grid">
                <div className="theory-card">
                  <div className="card-badge igei-badge">Egyszerű állítmány</div>
                  <h4>Igei állítmány</h4>
                  <p>Egyetlen ragozott ige fejezi ki a cselekvést vagy létezést.</p>
                  <div className="example-box">
                    <div>A diák <span className="highlight-predicate">számol</span>.</div>
                    <div><span className="highlight-predicate">Esik</span> az eső.</div>
                    <div>A könyv az asztalon <span className="highlight-predicate">van</span>.</div>
                  </div>
                </div>

                <div className="theory-card">
                  <div className="card-badge nevszoi-badge">Összetett állítmány A)</div>
                  <h4>Névszói állítmány</h4>
                  <p>
                    <strong>CSAK kijelentő mód jelen idő 3. személyben (E/3 és T/3)!</strong>
                    Ilyenkor a létige (van, vannak) teljesen hiányzik, maga a névszó az állítmány.
                  </p>
                  <div className="example-box">
                    <div>A rózsa <span className="highlight-predicate">szép</span>. (melléknév)</div>
                    <div>János <span className="highlight-predicate">tanár</span>. (főnév)</div>
                    <div>Az eredmény <span className="highlight-predicate">három</span>. (számnév)</div>
                  </div>
                </div>

                <div className="theory-card">
                  <div className="card-badge nevszoi-igei-badge">Összetett állítmány B)</div>
                  <h4>Névszói-igei állítmány</h4>
                  <p>
                    Minden más időben (múlt, jövő), módban és 1-2. személyben a névszó mellé kitesszük a létigét.
                    <strong>A két szót EGYÜTT húzzuk alá két vonallal!</strong>
                  </p>
                  <div className="example-box">
                    <div>A rózsa <span className="highlight-predicate">szép volt</span>. (múlt idő)</div>
                    <div>A rózsa <span className="highlight-predicate">szép lesz</span>. (jövő idő)</div>
                    <div><span className="highlight-predicate">Tanár vagyok</span>. (E/1)</div>
                  </div>
                </div>

                <div className="theory-card">
                  <div className="card-badge halmozott-badge">Szerkezeti forma</div>
                  <h4>Halmozott állítmány</h4>
                  <p>
                    Egy alanyhoz több egymással mellérendelt állítás tartozik. 
                    <strong> Fontos:</strong> A halmozottságtól függetlenül a mondatrész fajtája a meglévő típusokba sorolandó (hiszen mindegy, hogy 2 vagy 3 van belőle):
                  </p>
                  <div className="example-box">
                    <div><span className="highlight-predicate">olvasnak</span>, <span className="highlight-predicate">írnak</span> és <span className="highlight-predicate">számolnak</span> ➔ <strong>Igei állítmány</strong></div>
                    <div><span className="highlight-predicate">tiszta</span> és <span className="highlight-predicate">világos</span> ➔ <strong>Névszói állítmány</strong></div>
                    <div><span className="highlight-predicate">csendes és tágas volt</span> ➔ <strong>Névszói-igei állítmány</strong></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'alany' && (
            <div className="handbook-section">
              <div className="theory-hero-card hero-subject">
                <div className="hero-badge">Jelölés: Egyetlen vízszintes vonal ( ── )</div>
                <h3>Mit fejez ki az alany?</h3>
                <p>
                  Az alany az a mondatrész, <strong>AMIRŐL állítunk valamit</strong>.
                  Megnevezi azt a személyt, tárgyat vagy fogalmat, akire vagy amire az állítmányban kifejezett
                  cselekvés, történés vagy tulajdonság vonatkozik.
                </p>
                <div className="hero-question">
                  <HelpCircle size={18} />
                  <span>Kérdései: <strong>Ki? Mi? Kik? Mik? + az állítmány</strong></span>
                </div>
              </div>

              <div className="theory-grid">
                <div className="theory-card">
                  <div className="card-badge">Fajták</div>
                  <h4>Határozott alany</h4>
                  <p>Pontosan tudjuk, kiről/miről van szó (tulajdonnév, határozott névelős főnév, személyes névmás).</p>
                  <div className="example-box">
                    <div><span className="highlight-subject">Péter</span> olvas.</div>
                    <div>A <span className="highlight-subject">tanár</span> magyaráz.</div>
                    <div><span className="highlight-subject">Ők</span> elmentek.</div>
                  </div>
                </div>

                <div className="theory-card">
                  <div className="card-badge">Fajták</div>
                  <h4>Határozatlan alany</h4>
                  <p>Nem tudjuk vagy nem akarjuk pontosan megnevezni a cselekvőt (valaki, valami, egy ismeretlen).</p>
                  <div className="example-box">
                    <div><span className="highlight-subject">Valaki</span> zörget az ajtón.</div>
                    <div><span className="highlight-subject">Egy lány</span> sétál a parkban.</div>
                  </div>
                </div>

                <div className="theory-card">
                  <div className="card-badge">Fajták</div>
                  <h4>Általános alany</h4>
                  <p>A cselekvés mindenkire, bárkire vagy senkire vonatkozik (mindenki, senki, az ember, közmondások).</p>
                  <div className="example-box">
                    <div><span className="highlight-subject">Mindenki</span> megérkezett.</div>
                    <div><span className="highlight-subject">Senki</span> sem maradt le.</div>
                    <div><span className="highlight-subject">Ki</span> mint veti ágyát, úgy alussza álmát.</div>
                  </div>
                </div>

                <div className="theory-card">
                  <div className="card-badge">Fajták</div>
                  <h4>Rejtett alany</h4>
                  <p>Nincs szóval kitéve, de az ige személyragja elárulja! Zárójelben jelöljük.</p>
                  <div className="example-box">
                    <div>Leckét írok. ➔ <span className="highlight-subject">[Én]</span></div>
                    <div>Megérkeztetek. ➔ <span className="highlight-subject">[Ti]</span></div>
                    <div>Futottak a réten. ➔ <span className="highlight-subject">[Ők]</span></div>
                  </div>
                </div>

                <div className="theory-card" style={{ gridColumn: 'span 2' }}>
                  <div className="card-badge halmozott-badge">Szerkezeti forma</div>
                  <h4>Halmozott alany</h4>
                  <p>
                    Kettő vagy több azonos szerepű alany végzi vagy hordozza az állítást. 
                    <strong> Fontos:</strong> A halmozott alany fajtája megegyezik a tagjai fajtájával:
                  </p>
                  <div className="example-box">
                    <div><span className="highlight-subject">Péter</span> és <span className="highlight-subject">Pál</span> a táblánál dolgozik. ➔ <strong>Határozott alany</strong> (tulajdonnevek)</div>
                    <div>A <span className="highlight-subject">füzet</span> és a <span className="highlight-subject">könyv</span> az asztalon van. ➔ <strong>Határozott alany</strong> (határozott névelős főnevek)</div>
                    <div><span className="highlight-subject">Valaki</span> vagy <span className="highlight-subject">valami</span> zörög. ➔ <strong>Határozatlan alany</strong></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'csapdak' && (
            <div className="handbook-section">
              <div className="theory-hero-card hero-trap">
                <div className="hero-badge">⚠️ 7. Osztályos Veszélyzóna!</div>
                <h3>Amikor az alany szófaja FŐNÉVI IGENÉV (-ni)</h3>
                <p>
                  A diákok leggyakoribb hibája: a <em>-ni</em> végű szót azonnal állítmánynak hiszik, mert cselekvést fejez ki.
                  <strong> Pedig ez a mondat ALANYA!</strong>
                </p>
              </div>

              <div className="trap-explanation-box">
                <h4>A Varázsszavak trükkje:</h4>
                <p>
                  Ha a mondatban ilyen szavakat látsz: <strong>kell, muszáj, lehet, szabad, illik</strong> vagy
                  <strong> jó, szép, nehéz, könnyű + volt/lesz</strong>, akkor az ÁLLÍTMÁNY ez a szó, a <em>-ni</em> képzős szó pedig az <strong>ALANY</strong>!
                </p>
              </div>

              <div className="trap-cards-container">
                <div className="trap-card">
                  <div className="trap-sentence">„Tanulni kell.”</div>
                  <div className="trap-analysis">
                    <div><strong>Állítmány:</strong> <span className="highlight-predicate">kell</span> (Mit állítunk? ➔ kell)</div>
                    <div><strong>Alany:</strong> <span className="highlight-subject">Tanulni</span> (Mi kell? ➔ tanulni!)</div>
                  </div>
                  <div className="trap-note">A diákok 90%-a a tanulnit húzza alá állítmánynak. Te ne ess ebbe a csapdába!</div>
                </div>

                <div className="trap-card">
                  <div className="trap-sentence">„Élni jó.”</div>
                  <div className="trap-analysis">
                    <div><strong>Állítmány:</strong> <span className="highlight-predicate">jó</span> (Mit állítunk a létezésről? ➔ jó = névszói Á)</div>
                    <div><strong>Alany:</strong> <span className="highlight-subject">Élni</span> (Mi jó? ➔ élni!)</div>
                  </div>
                </div>

                <div className="trap-card">
                  <div className="trap-sentence">„Kora reggel felkelni nehéz volt.”</div>
                  <div className="trap-analysis">
                    <div><strong>Állítmány:</strong> <span className="highlight-predicate">nehéz volt</span> (névszói-igei Á)</div>
                    <div><strong>Alany:</strong> <span className="highlight-subject">felkelni</span> (Mi volt nehéz? ➔ felkelni!)</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'egyeztetes' && (
            <div className="handbook-section">
              <div className="theory-hero-card hero-agreement">
                <div className="hero-badge">Nyelvtani Szabályok</div>
                <h3>Az alany és az állítmány egyeztetése</h3>
                <p>
                  A magyar mondatban az alanyt és az állítmányt számban, személyben és értelemben össze kell egyeztetni!
                </p>
              </div>

              <div className="theory-grid">
                <div className="theory-card">
                  <h4>1. Számbeli egyeztetés & Mennyiségjelző</h4>
                  <p>Ha az alany előtt mennyiségjelző áll (<em>sok, kevés, öt, tíz</em>), az alany és az állítmány is <strong>egyes számban</strong> marad!</p>
                  <div className="example-box">
                    <div className="valid-row"><CheckCircle size={16} /> Helyes: Sok diák <strong>érkezett</strong>.</div>
                    <div className="invalid-row"><X size={16} /> Hibás: Sok diákok érkeztek.</div>
                  </div>
                </div>

                <div className="theory-card">
                  <h4>2. Személybeli rangsor halmozásnál</h4>
                  <p>Ha különböző személyű alanyok kapcsolódnak össze: <strong>1. személy &gt; 2. személy &gt; 3. személy</strong>.</p>
                  <div className="example-box">
                    <div>Én és a testvérem moziba <strong>megyünk</strong> (mi = T/1).</div>
                    <div>Te és a barátod könyvet <strong>olvastok</strong> (ti = T/2).</div>
                  </div>
                </div>

                <div className="theory-card" style={{ gridColumn: 'span 2' }}>
                  <h4>3. Értelmi egyeztetés (Címek és gyűjtőnevek)</h4>
                  <p>Többes számú könyvcímek egyetlen művet jelölnek, és a gyűjtőnevek is egyes számú állítmányt kapnak:</p>
                  <div className="example-box">
                    <div className="valid-row"><CheckCircle size={16} /> Helyes: <em>A kőszívű ember fiai</em> történelmi <strong>regény</strong> (egyetlen könyv!).</div>
                    <div className="valid-row"><CheckCircle size={16} /> Helyes: A harmadik osztály kirándulni <strong>ment</strong> (nem mentek).</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button
            className="action-btn primary-btn"
            onClick={() => { soundManager.playClick(); onClose(); }}
          >
            Értem, mehet a játék! 🚀
          </button>
        </div>
      </div>
    </div>
  );
};
