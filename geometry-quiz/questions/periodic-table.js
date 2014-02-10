var periodicTableQuestion = (function(){
	
	// Periodic Table Data taken from Wikipedia http://en.wikipedia.org/wiki/Periodic_table
	// Available with the following license: http://en.wikipedia.org/wiki/Wikipedia:Text_of_Creative_Commons_Attribution-ShareAlike_3.0_Unported_License

	// Atomic Number	Symbol	Element	Group	Period	Valence electrons	Relative atomic mass	Electronegativity (Pauling)	First Ionization Energy (eV)	Atomic radii(pm)	Van der Waals radii(pm)	Covalent radii(pm)	Metallic character	Origin of name	Density g / cm3	Melt K	Boil K	Heat J/g·K	Abundance mg / kg
	var tsvPeriodicTable = "atomicNumber	symbol	element	group	period	valence	mass	electroNegativity	firstIonizationEnergy	atomicRadius	vanDerWaalsRadius	covalentRadius	character	etimology	density	meltingPoint	boilingPoint	specificHeat	abudance	\n"
	+"1	H	Hydrogen	1	1	1	1.00794	2.2	13.59844	25	120	38	diatomic nonmetal	the Greek 'hydro' and 'genes' meaning water-forming	8.988E-05	14.01	20.28	14.304	1400	\n"
	+"2	He	Helium	18	1	2	4.002602	-	24.58741	31	140	32	noble gas	the Greek 'helios' meaning sun	0.0001785	0.956	4.22	5.193	0.008	\n"
	+"3	Li	Lithium	1	2	1	6.941	0.98	5.39172	145	182	134	alkali metal	the Greek 'lithos' meaning stone	0.534	453.69	1560	3.582	20	\n"
	+"4	Be	Beryllium	2	2	2	9.012182	1.57	9.3227	105	-	90	alkaline earth metal	the Greek name for beryl, 'beryllo'	1.85	1560	2742	1.825	2.8	\n"
	+"5	B	Boron	13	2	3	10.811	2.04	8.29803	85	-	82	metalloid	the Arabic 'buraq', which was the name for borax	2.34	2349	4200	1.026	10	\n"
	+"6	C	Carbon	14	2	4	12.0107	2.55	11.2603	70	170	77	polyatomic nonmetal	the Latin 'carbo', meaning charcoal	2.267	3800	4300	0.709	200	\n"
	+"7	N	Nitrogen	15	2	5	14.0067	3.04	14.53414	65	155	75	diatomic nonmetal	the Greek 'nitron' and 'genes' meaning nitre-forming	0.0012506	63.15	77.36	1.04	19	\n"
	+"8	O	Oxygen	16	2	6	15.9994	3.44	13.61806	60	152	73	diatomic nonmetal	the Greek 'oxy' and 'genes' meaning acid-forming	0.001429	54.36	90.2	0.918	461000	\n"
	+"9	F	Fluorine	17	2	7	18.9984032	3.98	17.42282	50	147	71	diatomic nonmetal	the Latin 'fluere', meaning to flow	0.001696	53.53	85.03	0.824	585	\n"
	+"10	Ne	Neon	18	2	8	20.1797	-	21.5646	38	154	69	noble gas	the Greek 'neos', meaning new	0.0008999	24.56	27.07	1.03	0.005	\n"
	+"11	Na	Sodium	1	3	1	22.98976928	0.93	5.13908	180	227	154	alkali metal	the English word soda (natrium in Latin)	0.971	370.87	1156	1.228	23600	\n"
	+"12	Mg	Magnesium	2	3	2	24.305	1.31	7.64624	150	173	130	alkaline earth metal	Magnesia, a district of Eastern Thessaly in Greece	1.738	923	1363	1.023	23300	\n"
	+"13	Al	Aluminium	13	3	3	26.9815386	1.61	5.98577	125	-	118	poor metal	the Latin name for alum, 'alumen' meaning bitter salt	2.698	933.47	2792	0.897	82300	\n"
	+"14	Si	Silicon	14	3	4	28.0855	1.9	8.15169	110	210	111	metalloid	the Latin 'silex' or 'silicis', meaning flint	2.3296	1687	3538	0.705	282000	\n"
	+"15	P	Phosphorus	15	3	5	30.973762	2.19	10.48669	100	180	106	polyatomic nonmetal	the Greek 'phosphoros', meaning bringer of light	1.82	317.3	550	0.769	1050	\n"
	+"16	S	Sulfur	16	3	6	32.065	2.58	10.36001	100	180	102	polyatomic nonmetal	either from the Sanskrit 'sulvere', or the Latin 'sulfurium'	2.067	388.36	717.87	0.71	350	\n"
	+"17	Cl	Chlorine	17	3	7	35.453	3.16	12.96764	100	175	99	diatomic nonmetal	the Greek 'chloros', meaning greenish yellow	0.003214	171.6	239.11	0.479	145	\n"
	+"18	Ar	Argon	18	3	8	39.948	-	15.75962	71	188	97	noble gas	the Greek, 'argos', meaning idle	0.0017837	83.8	87.3	0.52	3.5	\n"
	+"19	K	Potassium	1	4	1	39.0983	0.82	4.34066	220	275	196	alkali metal	the English word potash (kalium in Latin)	0.862	336.53	1032	0.757	20900	\n"
	+"20	Ca	Calcium	2	4	2	40.078	1	6.11316	180	-	174	alkaline earth metal	the Latin 'calx' meaning lime	1.54	1115	1757	0.647	41500	\n"
	+"21	Sc	Scandium	3	4	2	44.955912	1.36	6.5615	160	-	144	transition metal	Scandinavia (with the Latin name Scandia)	2.989	1814	3109	0.568	22	\n"
	+"22	Ti	Titanium	4	4	2	47.867	1.54	6.8281	140	-	136	transition metal	Titans, the sons of the Earth goddess of Greek mythology	4.54	1941	3560	0.523	5650	\n"
	+"23	V	Vanadium	5	4	2	50.9415	1.63	6.7462	135	-	125	transition metal	Vanadis, an old Norse name for the Scandinavian goddess Freyja	6.11	2183	3680	0.489	120	\n"
	+"24	Cr	Chromium	6	4	1	51.9961	1.66	6.7665	140	-	127	transition metal	the Greek 'chroma', meaning colour	7.15	2180	2944	0.449	102	\n"
	+"25	Mn	Manganese	7	4	2	54.938045	1.55	7.43402	140	-	139	transition metal	either the Latin 'magnes', meaning magnet, or from the black magnesium oxide, 'magnesia nigra'	7.44	1519	2334	0.479	950	\n"
	+"26	Fe	Iron	8	4	2	55.845	1.83	7.9024	140	-	125	transition metal	the Anglo-Saxon name iren (ferrum in Latin)	7.874	1811	3134	0.449	56300	\n"
	+"27	Co	Cobalt	9	4	2	58.933195	1.91	7.6398	135	163	121	transition metal	the German word 'kobald', meaning goblin	8.86	1768	3200	0.421	25	\n"
	+"28	Ni	Nickel	10	4	2	58.6934	1.88	7.881	135	-	126	transition metal	the shortened of the German 'kupfernickel' meaning either devil's copper or St. Nicholas's copper	8.912	1728	3186	0.444	84	\n"
	+"29	Cu	Copper	11	4	1	63.546	1.9	7.72638	135	140	138	transition metal	the Old English name coper in turn derived from the Latin 'Cyprium aes', meaning a metal from Cyprus	8.96	1357.77	2835	0.385	60	\n"
	+"30	Zn	Zinc	12	4	2	65.409	1.65	9.3942	135	139	131	transition metal	the German, 'zinc', which may in turn be derived from the Persian word 'sing', meaning stone	7.134	692.88	1180	0.388	70	\n"
	+"31	Ga	Gallium	13	4	3	69.723	1.81	5.9993	130	187	126	poor metal	France (with the Latin name Gallia)	5.907	302.9146	2477	0.371	19	\n"
	+"32	Ge	Germanium	14	4	4	72.64	2.01	7.8994	125	-	122	metalloid	Germany (with the Latin name Germania)	5.323	1211.4	3106	0.32	1.5	\n"
	+"33	As	Arsenic	15	4	5	74.9216	2.18	9.7886	115	185	119	metalloid	the Greek name 'arsenikon' for the yellow pigment orpiment	5.776	1090 7	887	0.329	1.8	\n"
	+"34	Se	Selenium	16	4	6	78.96	2.55	9.75238	115	190	116	polyatomic nonmetal	Moon (with the Greek name selene)	4.809	453	958	0.321	0.05	\n"
	+"35	Br	Bromine	17	4	7	79.904	2.96	11.81381	115	185	114	diatomic nonmetal	the Greek 'bromos' meaning stench	3.122	265.8	332	0.474	2.4	\n"
	+"36	Kr	Krypton	18	4	8	83.798	3	13.99961	88	202	110	noble gas	the Greek 'kryptos', meaning hidden	0.003733	115.79	119.93	0.248	0.0005	\n"
	+"37	Rb	Rubidium	1	5	1	85.4678	0.82	4.17713	235	-	211	alkali metal	the Latin 'rubidius', meaning deepest red	1.532	312.46	961	0.363	90	\n"
	+"38	Sr	Strontium	2	5	2	87.62	0.95	5.6949	200	-	192	alkaline earth metal	Strontian, a small town in Scotland	2.64	1050	1655	0.301	370	\n"
	+"39	Y	Yttrium	3	5	2	88.90585	1.22	6.2171	180	-	162	transition metal	Ytterby, Sweden	4.469	1799	3609	0.298	33	\n"
	+"40	Zr	Zirconium	4	5	2	91.224	1.33	6.6339	155	-	148	transition metal	the Persian 'zargun', meaning gold coloured	6.506	2128	4682	0.278	165	\n"
	+"41	Nb	Niobium	5	5	1	92.906 38	1.6	6.75885	145	-	137	transition metal	Niobe, daughter of king Tantalus from Greek mythology	8.57	2750	5017	0.265	20	\n"
	+"42	Mo	Molybdenum	6	5	1	95.94	2.16	7.09243	145	-	145	transition metal	the Greek 'molybdos' meaning lead	10.22	2896	4912	0.251	1.2	\n"
	+"43	Tc	Technetium	7	5	1	98	1.9	7.28	135	-	156	transition metal	the Greek 'tekhnetos' meaning artificial	11.5	2430	4538	-	0.0005	\n"
	+"44	Ru	Ruthenium	8	5	1	101.07	2.2	7.3605	130	-	126	transition metal	Russia (with the Latin name Ruthenia)	12.37	2607	4423	0.238	0.001	\n"
	+"45	Rh	Rhodium	9	5	1	102.905 50	2.28	7.4589	135	-	135	transition metal	the Greek 'rhodon', meaning rose coloured	12.41	2237	3968	0.243	0.001	\n"
	+"46	Pd	Palladium	10	5	-	106.42	2.2	8.3369	140	163	131	transition metal	the then recently discovered asteroid Pallas, considered a planet at the time	12.02	1828.05	3236	0.244	0.015	\n"
	+"47	Ag	Silver	11	5	1	107.8682	1.93	7.5762	160	172	153	transition metal	the Anglo-Saxon name siolfur (argentum in Latin)	10.501	1234.93	2435	0.235	0.075	\n"
	+"48	Cd	Cadmium	12	5	2	112.411	1.69	8.9938	155	158	148	transition metal	the Latin name for the mineral calmine, 'cadmia'	8.69	594.22	1040	0.232	0.159	\n"
	+"49	In	Indium	13	5	3	114.818	1.78	5.78636	155	193	144	poor metal	the Latin 'indicium', meaning violet or indigo	7.31	429.75	2345	0.233	0.25	\n"
	+"50	Sn	Tin	14	5	4	118.71	1.96	7.3439	145	217	141	poor metal	the Anglo-Saxon word tin (stannum in Latin, meaning hard)	7.287	505.08	2875	0.228	2.3	\n"
	+"51	Sb	Antimony	15	5	5	121.76	2.05	8.6084	145	-	138	metalloid	the Greek 'anti - monos', meaning not alone (stibium in Latin)	6.685	903.78	1860	0.207	0.2	\n"
	+"52	Te	Tellurium	16	5	6	127.6	2.1	9.0096	140	206	135	metalloid	Earth, the third planet on solar system (with the Latin word tellus)	6.232	722.66	1261	0.202	0.001	\n"
	+"53	I	Iodine	17	5	7	126.904 47	2.66	10.45126	140	198	133	diatomic nonmetal	the Greek 'iodes' meaning violet	4.93	386.85	457.4	0.214	0.45	\n"
	+"54	Xe	Xenon	18	5	8	131.293	2.6	12.1298	108	216	130	noble gas	the Greek 'xenos' meaning stranger	0.005887	161.4	165.03	0.158	0.0005	\n"
	+"55	Cs	Caesium	1	6	1	132.9054519	0.79	3.8939	260	-	225	alkali metal	the Latin 'caesius', meaning sky blue	1.873	301.59	944	0.242	3	\n"
	+"56	Ba	Barium	2	6	2	137.327	0.89	5.2117	215	-	198	alkaline earth metal	the Greek 'barys', meaning heavy	3.594	1000	2170	0.204	425	\n"
	+"57	La	Lanthanum	-	6	2	138.90547	1.1	5.5769	195	-	169	lanthanide	the Greek 'lanthanein', meaning to lie hidden	6.145	1193	3737	0.195	39	\n"
	+"58	Ce	Cerium	-	6	2	140.116	1.12	5.5387	185	-	-	lanthanide	Ceres, the Roman God of agriculture	6.77	1068	3716	0.192	66.5	\n"
	+"59	Pr	Praseodymium	-	6	2	140.90765	1.13	5.473	185	-	-	lanthanide	the Greek 'prasios didymos' meaning green twin	6.773	1208	3793	0.193	9.2	\n"
	+"60	Nd	Neodymium	-	6	2	144.242	1.14	5.525	185	-	-	lanthanide	the Greek 'neos didymos' meaning new twin	7.007	1297	3347	0.19	41.5	\n"
	+"61	Pm	Promethium	-	6	2	145	-	5.582	185	-	-	lanthanide	Prometheus of Greek mythology who stole fire from the Gods and gave it to humans	7.26	1315	3273	-	0.0005	\n"
	+"62	Sm	Samarium	-	6	2	150.36	1.17	5.6436	185	-	-	lanthanide	Samarskite, the name of the mineral from which it was first isolated	7.52	1345	2067	0.197	7.05	\n"
	+"63	Eu	Europium	-	6	2	151.964	-	5.6704	185	-	-	lanthanide	Europe	5.243	1099	1802	0.182	2	\n"
	+"64	Gd	Gadolinium	-	6	2	157.25	1.2	6.1501	180	-	-	lanthanide	Johan Gadolin, chemist, physicist and mineralogist	7.895	1585	3546	0.236	6.2	\n"
	+"65	Tb	Terbium	-	6	2	158.92535	-	5.8638	175	-	-	lanthanide	-	8.229	1629	3503	0.182	1.2	\n"
	+"66	Dy	Dysprosium	-	6	2	162.5	1.22	5.9389	175	-	-	lanthanide	the Greek 'dysprositos', meaning hard to get	8.55	1680	2840	0.17	5.2	\n"
	+"67	Ho	Holmium	-	6	2	164.930 32	1.23	6.0215	175	-	-	lanthanide	Stockholm, Sweden (with the Latin name Holmia)	8.795	1734	2993	0.165	1.3	\n"
	+"68	Er	Erbium	-	6	2	167.259	1.24	6.1077	175	-	-	lanthanide	-	9.066	1802	3141	0.168	3.5	\n"
	+"69	Tm	Thulium	-	6	2	168.93421	1.25	6.18431	175	-	-	lanthanide	Thule, the ancient name for Scandinavia	9.321	1818	2223	0.16	0.52	\n"
	+"70	Yb	Ytterbium	-	6	2	173.04	-	6.25416	175	-	-	lanthanide	Ytterby, Sweden	6.965	1097	1469	0.155	3.2	\n"
	+"71	Lu	Lutetium	3	6	2	174.967	1.27	5.4259	175	-	160	lanthanide	Paris, France (with the Roman name Lutetia)	9.84	1925	3675	0.154	0.8	\n"
	+"72	Hf	Hafnium	4	6	2	178.49	1.3	6.82507	155	-	150	transition metal	Copenhagen, Denmark (with the Latin name Hafnia)	13.31	2506	4876	0.144	3	\n"
	+"73	Ta	Tantalum	5	6	2	180.94788	1.5	7.5496	145	-	138	transition metal	King Tantalus, father of Niobe from Greek mythology	16.654	3290	5731	0.14	2	\n"
	+"74	W	Tungsten	6	6	2	183.84	2.36	7.864	135	-	146	transition metal	the Swedish 'tung sten' meaning heavy stone (W is wolfram, the old name of the tungsten mineral wolframite)	19.25	3695	5828	0.132	1.3	\n"
	+"75	Re	Rhenium	7	6	2	186.207	1.9	7.8335	135	-	159	transition metal	Rhine, a river that flows from Grisons in the eastern Swiss Alps to the North Sea coast in the Netherlands (with the Latin name Rhenia)	21.02	3459	5869	0.137	0.0005	\n"
	+"76	Os	Osmium	8	6	2	190.23	2.2	8.4382	130	-	128	transition metal	the Greek 'osme', meaning smell	22.61	3306	5285	0.13	0.002	\n"
	+"77	Ir	Iridium	9	6	2	192.217	2.2	8.967	135	-	137	transition metal	Iris, the Greek goddess of the rainbow	22.56	2719	4701	0.131	0.001	\n"
	+"78	Pt	Platinum	10	6	1	195.084	2.28	8.9587	135	175	128	transition metal	the Spanish 'platina', meaning little silver	21.46	2041.4	4098	0.133	0.005	\n"
	+"79	Au	Gold	11	6	1	196.966569	2.54	9.2255	135	166	144	transition metal	the Anglo-Saxon word gold (aurum in Latin, meaning glow of sunrise)	19.282	1337.33	3129	0.129	0.004	\n"
	+"80	Hg	Mercury	12	6	2	200.59	2	10.4375	150	155	149	transition metal	Mercury, the first planet in the Solar System (Hg from former name hydrargyrum, from Greek hydr- water and argyros silver)	13.5336	234.43	629.88	0.14	0.085	\n"
	+"81	Tl	Thallium	13	6	3	204.3833	1.62	6.1082	190	196	148	poor metal	the Greek 'thallos', meaning a green twig	11.85	577	1746	0.129	0.85	\n"
	+"82	Pb	Lead	14	6	4	207.2	2.33	7.41666	180	202	147	poor metal	the Anglo-Saxon lead (plumbum in Latin)	11.342	600.61	2022	0.129	14	\n"
	+"83	Bi	Bismuth	15	6	5	208.9804	2.02	7.2856	160	-	146	poor metal	the German 'Bisemutum' a corruption of 'Weisse Masse' meaning white mass	9.807	544.7	1837	0.122	0.009	\n"
	+"84	Po	Polonium	16	6	6	210	2	8.417	190	-	-	poor metal	Poland, the native country of Marie Curie, who first isolated the element	9.32	527	1235	-	0.0005	\n"
	+"85	At	Astatine	17	6	7	210	2.2	-	-	-	-	metalloid	the Greek 'astatos', meaning unstable	7	575	610	-	0.0005	\n"
	+"86	Rn	Radon	18	6	8	220	-	10.7485	120	-	145	noble gas	From radium, as it was first detected as an emission from radium during radioactive decay	0.00973	202	211.3	0.094	0.0005	\n"
	+"87	Fr	Francium	1	7	1	223	0.7	4.0727	-	-	-	alkali metal	France, where it was first discovered	1.87	300	950	-	0.0005	\n"
	+"88	Ra	Radium	2	7	2	226	0.9	5.2784	215	-	-	alkaline earth metal	the Latin 'radius', meaning ray	5.5	973	2010	0.094	0.0005	\n"
	+"89	Ac	Actinium	-	7	2	227	1.1	5.17	195	-	-	actinide	the Greek 'actinos', meaning a ray	10.07	1323	3471	0.12	0.0005	\n"
	+"90	Th	Thorium	-	7	2	232.03806	1.3	6.3067	180	-	-	actinide	Thor, the Scandinavian god of thunder	11.72	2115	5061	0.113	9.6	\n"
	+"91	Pa	Protactinium	-	7	2	231.03588	1.5	5.89	180	-	-	actinide	the Greek 'protos', meaning first, as a prefix to the element actinium, which is produced through the radioactive decay of protactinium	15.37	1841	4300	-	0.0005	\n"
	+"92	U	Uranium	-	7	2	238.02891	1.38	6.19405	175	186	-	actinide	Uranus, the seventh planet in the Solar System	18.95	1405.3	4404	0.116	2.7	\n"
	+"93	Np	Neptunium	-	7	2	237	1.36	6.2657	175	-	-	actinide	Neptune, the eighth planet in the Solar System	20.45	917	4273	-	0.0005	\n"
	+"94	Pu	Plutonium	-	7	2	244	1.28	6.0262	175	-	-	actinide	Pluto, a dwarf planet in the Solar System	19.84	912.5	3501	-	0.0005	\n"
	+"95	Am	Americium	-	7	2	243	1.3	5.9738	175	-	-	actinide	Americas, the continent where the element was first synthesized	13.69	1449	2880	-	0.0005	\n"
	+"96	Cm	Curium	-	7	2	247	1.3	5.9915	-	-	-	actinide	Pierre Curie, a physicist, and Marie Curie, a physicist and chemist	13.51	1613	3383	-	0.0005	\n"
	+"97	Bk	Berkelium	-	7	2	247	1.3	6.1979	-	-	-	actinide	Berkeley, California, USA, where the element was first synthesized	14.79	1259	2900	-	0.0005	\n"
	+"98	Cf	Californium	-	7	2	251	1.3	6.2817	-	-	-	actinide	State of California, USA, where the element was first synthesized	15.1	1173	1743	-	0.0005	\n"
	+"99	Es	Einsteinium	-	7	2	252	1.3	6.42	-	-	-	actinide	Albert Einstein, physicist	8.84	1133	1269	-	-	\n"
	+"100	Fm	Fermium	-	7	2	257	1.3	6.5	-	-	-	actinide	Enrico Fermi, physicist	-	1125	-	-	-	\n"
	+"101	Md	Mendelevium	-	7	2	258	1.3	6.58	-	-	-	actinide	Dmitri Mendeleyev, chemist and inventor	-	1100	-	-	-	\n"
	+"102	No	Nobelium	-	7	2	259	1.3	6.65	-	-	-	actinide	Alfred Nobel, chemist, engineer, innovator, and armaments manufacturer	-	1100	-	-	-	\n"
	+"103	Lr	Lawrencium	3	7	3	262	-	4.9	-	-	-	actinide	Ernest O. Lawrence, physicist	-	1900	-	-	-	\n"
	+"104	Rf	Rutherfordium	4	7	-	261	-	6	-	-	-	transition metal	Ernest Rutherford, chemist and physicist	23.2	2400	5800	-	-	\n"
	+"105	Db	Dubnium	5	7	-	262	-	-	-	-	-	transition metal	Dubna, Russia	29.3	-	-	-	-	\n"
	+"106	Sg	Seaborgium	6	7	-	266	-	-	-	-	-	transition metal	Glenn T. Seaborg, scientist	35	-	-	-	-	\n"
	+"107	Bh	Bohrium	7	7	-	264	-	-	-	-	-	transition metal	Niels Bohr, physicist	37.1	-	-	-	-	\n"
	+"108	Hs	Hassium	8	7	-	277	-	-	-	-	-	transition metal	Hesse, Germany, where the element was first synthesized	40.7	-	-	-	-	\n"
	+"109	Mt	Meitnerium	9	7	-	268	-	-	-	-	-	-	Lise Meitner, physicist	37.4	-	-	-	-	\n"
	+"110	Ds	Darmstadtium	10	7	-	271	-	-	-	-	-	-	Darmstadt, Germany, where the element was first synthesized	34.8	-	-	-	-	\n"
	+"111	Rg	Roentgenium	11	7	-	272	-	-	-	-	-	-	Wilhelm Conrad Röntgen, physicist	28.7	-	-	-	-	\n"
	+"112	Cn	Copernicium	12	7	-	285	-	-	-	-	-	transition metal	Nicolaus Copernicus, astronomer	23.7	-	357	-	-	\n"
	+"113	Uut	Ununtrium	13	7	-	284	-	-	-	-	-	-	IUPAC systematic element name	16	700	1400	-	-	\n"
	+"114	Fl	Flerovium	14	7	-	289	-	-	-	-	-	-	Georgy Flyorov, physicist	14	340	420	-	-	\n"
	+"115	Uup	Ununpentium	15	7	-	288	-	-	-	-	-	-	IUPAC systematic element name	13.5	700	1400	-	-	\n"
	+"116	Lv	Livermorium	16	7	-	292	-	-	-	-	-	-	Lawrence Livermore National Laboratory (in Livermore, California) which collaborated with JINR on its synthesis	12.9	708.5	1085	-	-	\n"
	+"117	Uus	Ununseptium	17	7	-	294	-	-	-	-	-	-	IUPAC systematic element name	7.2	673	823	-	-	\n"
	+"118	Uuo	Ununoctium	18	7	-	294	-	-	-	-	-	-		IUPAC systematic element name	5	258	263	-	-";

	function delimetedToObjects(config){
		var rowDelimeter = 'rowDelimeter' in config ? config.rowDelimeter : '\n';
		var colDelimeter = 'colDelimeter' in config ? config.colDelimeter : '\t';

		var text = 'text' in config ? config.text : '';

		// start with the first 
		var headers = [];
		var rows = text.split(rowDelimeter);
		var nRows = rows.length;
		var row = rows[0];
		var cols = row.split(colDelimeter);
		var i,j,nCols=cols.length;
		for( i=0; i<nCols; i+=1 ){
			headers.push( cols[i] );
		}		

		var entry, entries = [];
		for( i=1; i<nRows; i+=1 ){
			cols = rows[i].split(colDelimeter);
			entry = {};
			for( j=0; j<nCols; j+=1 ){
				entry[headers[j]] = cols[j];
			}
			entries.push(entry);
		}

		return entries;
	}

	var elements = delimetedToObjects({
		colDelimeter: '\t',
		text: tsvPeriodicTable
	});

	function filter( things, checkIsOk ){
		var filtered = [];
		var i, l=things.length;
		for( i=0; i<l; i+=1 ){
			if( checkIsOk( things[i] ) ){
				filtered.push(things[i]);
			}
		}
		return filtered;
	}

	function chooseRandom(group,n){
		var results = [];
		var nEntries = group.length, index, selected = [];
		while( results.length < n ){
			index = Math.floor( Math.random()*nEntries );
			if( !(index in selected) ){
				selected[index] = true;
				results.push( group[index] );
			}
		}
		return results;
	}

	function shuffle(things) {
		var nThings = things.length;
		var i, a, b, swap, l = Math.floor(nThings * 0.5);
		for (i = 0; i < l; i += 1) {
		    a = Math.floor(Math.random() * nThings);
		    b = Math.floor(Math.random() * nThings);
		    swap = things[a];
		    things[a] = things[b];
		    things[b] = swap;
		}
		return things;
	}

	function hasValidProperty( obj, property ){
		return (property in obj) && (obj[property] !== '-');
	}

	function byIncreasing( property ){
		return function(a,b){
			return parseFloat(a[property]) - parseFloat(b[property]);
		}
	}
	function byDecreasing( property ){
		return function(a,b){
			return parseFloat(b[property]) - parseFloat(a[property]);
		}
	}

	function getSortFunction(sortType){
		if( sortType === 'increasing' ){
			return byIncreasing;
		}else{
			return byDecreasing;
		}
	}

	var makeNumericPropertyQuestion = function(property,sortBy,question){
		return function(quiz,options){
			var minAtomicIndex = parseInt(('minatomicindex' in options) ? options.minatomicindex : '1') - 1;
			var maxAtomicIndex = parseInt(('maxatomicindex' in options) ? options.maxatomicindex : '118') - 1;

			var subsetElements = elements.slice(minAtomicIndex,maxAtomicIndex);

			var validElements = filter( subsetElements, function(elem){
				return hasValidProperty(elem,property)
			} );
			var choices = chooseRandom( validElements, 4 );
			var sorted = choices.sort(sortBy(property));
			var answer = choices[0].element;
			choices = shuffle(choices);

			var answers = [
				choices[0].element,
				choices[1].element,
				choices[2].element,
				choices[3].element
			];


			quiz.onResize = quiz.doNothing;

			quiz.choiceSet(1,answers[0], answer===answers[0]);
			quiz.choiceSet(2,answers[1], answer===answers[1]);
			quiz.choiceSet(3,answers[2], answer===answers[2]);
			quiz.choiceSet(4,answers[3], answer===answers[3]);

			quiz.questionLongText(question);
		};
	};

	function makePropertyQuestion(property,question){
		return function( quiz, options ){
			var minAtomicIndex = parseInt(('minatomicindex' in options) ? options.minatomicindex : '1') - 1;
			var maxAtomicIndex = parseInt(('maxatomicindex' in options) ? options.maxatomicindex : '118') - 1;

			var subsetElements = elements.slice(minAtomicIndex,maxAtomicIndex);

			var validElements = filter( subsetElements, function(elem){
				return hasValidProperty(elem,property)
			} );
			var choices = chooseRandom( validElements, 4 );
			var answer = choices[0];
			choices = shuffle(choices);

			var answers = [
				choices[0].element,
				choices[1].element,
				choices[2].element,
				choices[3].element
			];
			quiz.onResize = quiz.doNothing;

			quiz.choiceSet(1,answers[0], answer[property]===choices[0][property]);
			quiz.choiceSet(2,answers[1], answer[property]===choices[1][property]);
			quiz.choiceSet(3,answers[2], answer[property]===choices[2][property]);
			quiz.choiceSet(4,answers[3], answer[property]===choices[3][property]);

			quiz.questionLongText(question.replace(/{{property}}/,answer[property]));
		};
	}

	var nameQuestion = function( quiz, options ){
		var minAtomicIndex = parseInt(('minatomicindex' in options) ? options.minatomicindex : '1') - 1;
		var maxAtomicIndex = parseInt(('maxatomicindex' in options) ? options.maxatomicindex : '118') - 1;

		var subsetElements = elements.slice(minAtomicIndex,maxAtomicIndex);

		var validElements = filter( subsetElements, function(elem){
			return hasValidProperty(elem,'etimology')
		} );
		var choices = chooseRandom( validElements, 4 );
		var text = choices[0].etimology;
		var answer = choices[0].element;
		choices = shuffle(choices);

		var answers = [
			choices[0].element,
			choices[1].element,
			choices[2].element,
			choices[3].element
		];

		quiz.onResize = quiz.doNothing;

		quiz.choiceSet(1,answers[0], answer===answers[0]);
		quiz.choiceSet(2,answers[1], answer===answers[1]);
		quiz.choiceSet(3,answers[2], answer===answers[2]);
		quiz.choiceSet(4,answers[3], answer===answers[3]);

		quiz.questionLongText('Is named for '+text+'.');
	};

	var lessMass = makeNumericPropertyQuestion('mass',byIncreasing,'Which has the smallest atomic mass?');
	var moreMass = makeNumericPropertyQuestion('mass',byDecreasing,'Which has the largest atomic mass?');
	var lessRadius = makeNumericPropertyQuestion('atomicRadius',byIncreasing,'Which has the smallest atomic radius?');
	var moreRadius = makeNumericPropertyQuestion('atomicRadius',byDecreasing,'Which has the largest atomic radius?');
	var lessAtomicNumber = makeNumericPropertyQuestion('atomicNumber',byIncreasing,'Which has the lowest atomic number?');
	var moreAtomicNumber = makeNumericPropertyQuestion('atomicNumber',byDecreasing,'Which has the highest atomic number?');
	var lessElectroNegativity = makeNumericPropertyQuestion('electroNegativity',byIncreasing,'Which has the lowest eletro-negativity?');
	var moreElectroNegativity = makeNumericPropertyQuestion('electroNegativity',byDecreasing,'Which has the highest eletro-negativity?');
	var lessIonizationEnergy = makeNumericPropertyQuestion('firstIonizationEnergy',byIncreasing,'Which has the lowest first ionization energy?');
	var moreIonizationEnergy = makeNumericPropertyQuestion('firstIonizationEnergy',byDecreasing,'Which has the highest first ionization energy?');
	var lessDensity = makeNumericPropertyQuestion('density',byIncreasing,'Which has the lowest density?');
	var moreDensity = makeNumericPropertyQuestion('density',byDecreasing,'Which has the highest density?');
	var lessMeltingPoint = makeNumericPropertyQuestion('meltingPoint',byIncreasing,'Which has the lowest melting point?');
	var moreMeltingPoint = makeNumericPropertyQuestion('meltingPoint',byDecreasing,'Which has the highest melting point?');
	var lessBoilingPoint = makeNumericPropertyQuestion('boilingPoint',byIncreasing,'Which has the lowest boiling point?');
	var moreBoilingPoint = makeNumericPropertyQuestion('boilingPoint',byDecreasing,'Which has the highest boiling point?');
	var lessSpecificHeat = makeNumericPropertyQuestion('specificHeat',byIncreasing,'Which has the lowest specific heat?');
	var moreSpecificHeat = makeNumericPropertyQuestion('specificHeat',byDecreasing,'Which has the highest specific heat?');
	var lessAbudance = makeNumericPropertyQuestion('abudance',byIncreasing,'Which is least abudant in Earth\'s crust?');
	var moreAbudance = makeNumericPropertyQuestion('abudance',byDecreasing,'Which is most abudant in Earth\'s crust?');
	var etimology = makePropertyQuestion('etimology','Is named for {{property}}.');
	var group = makePropertyQuestion('group','Is in group {{property}}.');
	var period = makePropertyQuestion('period','Is in period {{property}}.');
	var atomicNumber = makePropertyQuestion('atomicNumber','Has atomic number {{property}}.');
	var symbol = makePropertyQuestion('symbol','Is symbolized by [{{property}}].');
	var character = makePropertyQuestion('character','Is a {{property}}.');

	function combineQuestions(questions){
		return function(quiz,options){
			var question = chooseRandom(questions,1)[0];
			question(quiz,options);
		};
	}

	var simple = combineQuestions([etimology,group,period,atomicNumber,symbol]);
	var trends = combineQuestions([ lessMass,moreMass,lessRadius,moreRadius,lessAtomicNumber,moreAtomicNumber,lessElectroNegativity,moreElectroNegativity,lessIonizationEnergy,moreIonizationEnergy,lessDensity,moreDensity,lessMeltingPoint,moreMeltingPoint,lessBoilingPoint,moreBoilingPoint,lessSpecificHeat,moreSpecificHeat,lessAbudance,moreAbudance]);
	var any = combineQuestions( [simple, trends] );

	return {

		lessMass:lessMass,
		moreMass:moreMass,
		mass: combineQuestions([lessMass,moreMass]),

		lessRadius:lessRadius,
		moreRadius:moreRadius,
		radius: combineQuestions([lessRadius,moreRadius]),

		lessAtomicNumber:lessAtomicNumber,
		moreAtomicNumber:moreAtomicNumber,
		atomicNumber: combineQuestions([lessAtomicNumber,moreAtomicNumber]),

		lessElectroNegativity:lessElectroNegativity,
		moreElectroNegativity:moreElectroNegativity,
		electroNegativity: combineQuestions([lessElectroNegativity,moreElectroNegativity]),

		lessIonizationEnergy:lessIonizationEnergy,
		moreIonizationEnergy:moreIonizationEnergy,
		ionizationEnergy: combineQuestions([lessIonizationEnergy,moreIonizationEnergy]),

		lessDensity:lessDensity,
		moreDensity:moreDensity,
		density: combineQuestions([lessDensity,moreDensity]),

		lessMeltingPoint:lessMeltingPoint,
		moreMeltingPoint:moreMeltingPoint,
		meltingPoint: combineQuestions([lessMeltingPoint,moreMeltingPoint]),

		lessBoilingPoint:lessBoilingPoint,
		moreBoilingPoint:moreBoilingPoint,
		boilingPoint: combineQuestions([lessBoilingPoint,moreBoilingPoint]),

		lessSpecificHeat:lessSpecificHeat,
		moreSpecificHeat:moreSpecificHeat,
		specificHeat: combineQuestions([lessSpecificHeat,moreSpecificHeat]),

		lessAbudance:lessAbudance,
		moreAbudance:moreAbudance,
		abudance: combineQuestions([lessAbudance,moreAbudance]),

		etimology:etimology,
		group:group,
		period:period,
		atomicNumber:atomicNumber,
		symbol:symbol,

		simple: simple,
		trends: trends,
		any: any
	};

})();
