"""Generate lightweight, brandless illustrative artwork for consultation cards."""
from pathlib import Path

assets = Path(__file__).resolve().parents[1] / 'docs' / 'assets'
assets.mkdir(parents=True, exist_ok=True)

defs = '''<defs>
<linearGradient id="dark" x1="0" x2="1" y2="1"><stop stop-color="#4b5450"/><stop offset=".4" stop-color="#252e2b"/><stop offset="1" stop-color="#101b16"/></linearGradient>
<linearGradient id="edge" x1="0" x2="1" y2="0"><stop stop-color="#59675e"/><stop offset=".4" stop-color="#b0b7ac"/><stop offset=".7" stop-color="#38493e"/><stop offset="1" stop-color="#8c9c8a"/></linearGradient>
<linearGradient id="white" x1="0" x2="1" y2="1"><stop stop-color="#fff"/><stop offset=".5" stop-color="#f3f5ed"/><stop offset="1" stop-color="#c8cfbf"/></linearGradient>
<linearGradient id="green" x1="0" x2="1" y2="1"><stop stop-color="#d6e6c4"/><stop offset=".45" stop-color="#8eab70"/><stop offset="1" stop-color="#4c6b43"/></linearGradient>
<linearGradient id="screen" x1="0" x2="1" y2="1"><stop stop-color="#07271d"/><stop offset=".5" stop-color="#317b52"/><stop offset="1" stop-color="#c2f76b"/></linearGradient>
<radialGradient id="lens"><stop stop-color="#234145"/><stop offset=".6" stop-color="#0b161a"/><stop offset="1" stop-color="#000"/></radialGradient>
<filter id="shadow" x="-.4" y="-.4" width="1.8" height="1.9"><feGaussianBlur stdDeviation="8"/></filter>
<pattern id="mesh" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".8" fill="#9caba3" opacity=".24"/></pattern>
</defs>'''

art = {}
art['smartphone.svg'] = '''
<ellipse cx="205" cy="294" rx="107" ry="12" fill="#506443" opacity=".18" filter="url(#shadow)"/>
<g transform="rotate(-14 145 173)"><rect x="95" y="56" width="112" height="229" rx="19" fill="url(#edge)"/><rect x="99" y="58" width="104" height="225" rx="16" fill="url(#dark)"/><rect x="110" y="70" width="46" height="77" rx="14" fill="#46564a"/><circle cx="132" cy="91" r="15" fill="#b4bcb0"/><circle cx="132" cy="91" r="12" fill="url(#lens)"/><circle cx="128" cy="86" r="3" fill="#508998" opacity=".5"/><circle cx="132" cy="125" r="15" fill="#b4bcb0"/><circle cx="132" cy="125" r="12" fill="url(#lens)"/><circle cx="162" cy="97" r="4" fill="#d1d8c5"/></g>
<g transform="rotate(9 235 177)"><rect x="184" y="62" width="113" height="232" rx="20" fill="url(#edge)"/><rect x="187" y="64" width="107" height="228" rx="17" fill="#09130e"/><rect x="193" y="71" width="95" height="213" rx="12" fill="url(#screen)"/><path d="M193 122c43 25 95 74 95 125-39-10-51-75-95-79Z" fill="#c2f76b" opacity=".5"/><path d="M193 78c77 83 92 100 95 155" fill="none" stroke="#ebffdd" stroke-width=".8" opacity=".5"/><path d="M194 276c15-92 54-108 93-75" fill="none" stroke="#e0ffbd" stroke-width=".8" opacity=".6"/><circle cx="240" cy="83" r="4" fill="#07211a"/><rect x="224" y="273" width="34" height="2.5" rx="1.2" fill="#e7ffdb" opacity=".7"/></g>'''

art['case.svg'] = '''
<ellipse cx="207" cy="293" rx="103" ry="12" fill="#506443" opacity=".18" filter="url(#shadow)"/>
<g transform="rotate(-17 156 169)"><rect x="102" y="58" width="110" height="229" rx="24" fill="#9ca792"/><rect x="107" y="61" width="101" height="222" rx="20" fill="url(#green)"/><rect x="119" y="73" width="54" height="60" rx="15" fill="#516a47"/><rect x="125" y="79" width="42" height="48" rx="11" fill="#dde5d5"/><path d="M113 147v100c0 18 10 25 25 25" fill="none" stroke="#e5efda" stroke-width="2" opacity=".35"/></g>
<g transform="rotate(13 251 174)"><rect x="195" y="59" width="108" height="228" rx="24" fill="#c6cec2"/><rect x="201" y="64" width="97" height="217" rx="19" fill="#f3f6ed" opacity=".58"/><rect x="211" y="75" width="52" height="59" rx="15" fill="#b6c3ac"/><rect x="217" y="81" width="40" height="47" rx="10" fill="#e8ede2"/><circle cx="249" cy="196" r="31" fill="none" stroke="#fbfcf8" stroke-width="5"/><path d="M249 232v17" stroke="#fbfcf8" stroke-width="5" stroke-linecap="round"/><path d="M206 141v111c0 17 7 23 18 23" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/></g>'''

art['earbuds.svg'] = '''
<ellipse cx="203" cy="280" rx="107" ry="13" fill="#526044" opacity=".18" filter="url(#shadow)"/>
<g transform="rotate(-6 193 201)"><rect x="100" y="164" width="177" height="114" rx="44" fill="url(#white)" stroke="#c1c9bc"/><rect x="104" y="160" width="169" height="46" rx="22" fill="#d1dacb"/><ellipse cx="154" cy="182" rx="25" ry="16" fill="#a8b59d"/><ellipse cx="227" cy="182" rx="25" ry="16" fill="#a8b59d"/><rect x="94" y="102" width="187" height="74" rx="36" fill="url(#white)" stroke="#c6cfbf"/><rect x="105" y="111" width="165" height="52" rx="26" fill="#d3dbce"/><ellipse cx="148" cy="138" rx="28" ry="15" fill="#bdc9b6"/><ellipse cx="229" cy="138" rx="28" ry="15" fill="#bdc9b6"/><path d="M107 220c35 7 134 7 157-1" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/><circle cx="190" cy="236" r="2" fill="#7cb748"/></g>
<g transform="rotate(-28 128 197)"><rect x="119" y="188" width="18" height="56" rx="9" fill="url(#white)"/><ellipse cx="125" cy="184" rx="26" ry="19" fill="url(#white)" stroke="#c9d2c2"/><ellipse cx="106" cy="182" rx="5" ry="9" fill="#2c3a30"/><rect x="120" y="231" width="16" height="4" rx="2" fill="#c2cdbb"/></g>
<g transform="rotate(32 280 239)"><rect x="270" y="211" width="18" height="58" rx="9" fill="url(#white)"/><ellipse cx="275" cy="207" rx="26" ry="19" fill="url(#white)" stroke="#c9d2c2"/><ellipse cx="294" cy="205" rx="5" ry="9" fill="#2c3a30"/><rect x="271" y="255" width="16" height="4" rx="2" fill="#c2cdbb"/></g>'''

art['charger.svg'] = '''
<ellipse cx="203" cy="275" rx="94" ry="14" fill="#526044" opacity=".18" filter="url(#shadow)"/>
<g transform="rotate(-9 200 170)"><path d="m133 111 98-28 54 33-98 32Z" fill="#fbfcf8" stroke="#d5dbce"/><path d="m133 111 54 37v129l-54-40Z" fill="#c7d0bd" stroke="#bbc6af"/><path d="m187 148 98-32v123l-98 38Z" fill="url(#white)" stroke="#ccd5c1"/><path d="m144 94 9-3v-42l-9 3Z" fill="url(#edge)"/><path d="m185 82 10-3V36l-10 3Z" fill="url(#edge)"/><path d="m144 49 9-3 4 2-10 4Z" fill="#d9dfd2"/><path d="m185 36 10-3 4 2-10 4Z" fill="#d9dfd2"/><g transform="skewY(-18)"><rect x="211" y="245" width="40" height="14" rx="5" fill="#87947c"/><rect x="215" y="248" width="32" height="8" rx="3" fill="#233325"/><rect x="219" y="251" width="24" height="2" rx="1" fill="#a9bd94"/></g><path d="m192 164 1 100 78-28" fill="none" stroke="#fff" stroke-width="2" opacity=".6"/></g>'''

art['glass.svg'] = '''
<ellipse cx="204" cy="291" rx="99" ry="12" fill="#526044" opacity=".18" filter="url(#shadow)"/>
<g transform="rotate(10 239 174)"><rect x="185" y="54" width="110" height="236" rx="18" fill="url(#edge)"/><rect x="189" y="58" width="102" height="229" rx="15" fill="#172920"/><rect x="195" y="65" width="90" height="214" rx="10" fill="url(#screen)"/><path d="m195 75 90 132v72h-15L195 116Z" fill="#c3f690" opacity=".18"/><rect x="219" y="68" width="40" height="10" rx="5" fill="#11251b"/></g>
<g transform="rotate(-14 153 164)"><rect x="96" y="43" width="113" height="236" rx="21" fill="#d7e1cb" opacity=".5" stroke="#a8b59d" stroke-width="2"/><rect x="102" y="49" width="101" height="224" rx="16" fill="#f6fff2" opacity=".22" stroke="#fff" stroke-width="1.5"/><path d="m103 72 100 132v53L103 124Z" fill="#fff" opacity=".25"/><path d="m110 68 88 117" stroke="#fff" stroke-width="2" opacity=".7"/><rect x="133" y="51" width="38" height="9" rx="4.5" fill="#e7eddf" stroke="#b8c5ac"/></g>'''

art['speaker.svg'] = '''
<ellipse cx="202" cy="265" rx="133" ry="16" fill="#526044" opacity=".22" filter="url(#shadow)"/>
<g transform="rotate(-11 205 181)"><rect x="78" y="113" width="247" height="140" rx="57" fill="url(#dark)" stroke="#5d6d60"/><rect x="92" y="121" width="220" height="124" rx="48" fill="url(#mesh)"/><ellipse cx="90" cy="183" rx="22" ry="60" fill="#364a39" stroke="#759463"/><ellipse cx="90" cy="183" rx="15" ry="47" fill="#172d1c"/><ellipse cx="309" cy="183" rx="19" ry="57" fill="#2a3f2e"/><path d="M127 121c34-11 131-12 164 3" fill="none" stroke="#a2b596" opacity=".4"/><rect x="161" y="150" width="90" height="14" rx="7" fill="#182c1c"/><path d="M175 157h9m-5-4v8m22-4h8m21-4v8" fill="none" stroke="#9db38b" stroke-width="1.5"/><rect x="185" y="205" width="39" height="13" rx="3" fill="#aeca88"/><path d="M305 126c7-35 48-41 51-13 4 30-22 56-41 55" fill="none" stroke="#536949" stroke-width="7"/></g>'''

art['cable.svg'] = '''
<ellipse cx="202" cy="273" rx="103" ry="14" fill="#526044" opacity=".18" filter="url(#shadow)"/>
<path d="M143 119c-68 29-59 127 11 140 79 14 146-12 130-78-15-63-132-44-130 6 2 39 78 44 92 8 15-38-54-78-63-56-14 37 60 87 100 58" fill="none" stroke="#aeb8a2" stroke-width="10"/>
<path d="M143 119c-68 29-59 127 11 140 79 14 146-12 130-78-15-63-132-44-130 6 2 39 78 44 92 8 15-38-54-78-63-56-14 37 60 87 100 58" fill="none" stroke="url(#white)" stroke-width="7"/>
<g transform="rotate(-16 145 112)"><rect x="130" y="79" width="30" height="60" rx="8" fill="url(#white)" stroke="#bdc8b0"/><rect x="133" y="52" width="24" height="33" rx="3" fill="url(#edge)"/><rect x="138" y="61" width="5" height="7" rx="1" fill="#6c7e63"/><rect x="148" y="61" width="5" height="7" rx="1" fill="#6c7e63"/><rect x="139" y="109" width="13" height="6" rx="2" fill="#bdc9b3"/></g>
<g transform="rotate(43 294 196)"><rect x="281" y="152" width="26" height="55" rx="8" fill="url(#white)" stroke="#bdc8b0"/><rect x="284" y="132" width="20" height="25" rx="7" fill="url(#edge)"/><rect x="289" y="131" width="10" height="4" rx="2" fill="#697c60"/><path d="M286 170h16" stroke="#d5dec9" stroke-width="1"/></g>'''

art['headphones.svg'] = '''
<ellipse cx="201" cy="280" rx="102" ry="12" fill="#526044" opacity=".2" filter="url(#shadow)"/>
<path d="M270 225c-4 30-31 31-33 50-4 38 38 30 54 32" fill="none" stroke="#687d5d" stroke-width="3"/>
<g transform="rotate(-11 200 171)"><path d="M117 184v-47c0-110 167-109 167 0v47" fill="none" stroke="#273b2a" stroke-width="24"/><path d="M123 159v-21c0-95 155-95 155 0v21" fill="none" stroke="#829f6f" stroke-width="12"/><path d="M135 93c36-45 97-45 130 0" fill="none" stroke="#bacfa5" stroke-width="8" stroke-linecap="round"/><path d="M112 153v53m171-53v53" stroke="url(#edge)" stroke-width="12"/><rect x="93" y="166" width="46" height="96" rx="20" fill="#15231a" stroke="#547448"/><rect x="105" y="163" width="43" height="94" rx="20" fill="url(#green)"/><rect x="108" y="173" width="22" height="74" rx="11" fill="#8faa72"/><rect x="263" y="166" width="44" height="96" rx="20" fill="#15231a" stroke="#547448"/><rect x="252" y="163" width="43" height="94" rx="20" fill="url(#green)"/><rect x="270" y="173" width="20" height="74" rx="10" fill="#8faa72"/><circle cx="124" cy="214" r="9" fill="none" stroke="#d4e0c6" opacity=".45"/></g>
<g transform="rotate(80 300 307)"><rect x="292" y="291" width="14" height="32" rx="4" fill="#556b49"/><rect x="295" y="272" width="8" height="21" rx="2" fill="url(#edge)"/></g>'''

for name, subject in art.items():
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 340" width="400" height="340">{defs}{subject}</svg>'
    (assets / name).write_text(svg)
print(f'Generated {len(art)} SVG assets')
