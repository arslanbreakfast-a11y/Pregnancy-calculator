export interface TrimesterGuide {
  trimester: 1 | 2 | 3;
  name: string;
  weeksSpan: string;
  overview: string;
  theme: string;
  keyHighlights: string[];
  commonSymptoms: { symptom: string; explanation: string; remedy: string }[];
  essentialMedicalChecks: string[];
  doAndDont: { do: string[]; dont: string[] };
}

export const PREGNANCY_GUIDE_DATA: TrimesterGuide[] = [
  {
    trimester: 1,
    name: 'First Trimester',
    weeksSpan: 'Weeks 1 to 13',
    theme: 'Foundations & Cellular Magic',
    overview:
      'The first trimester is an astonishing period of rapid cellular proliferation and embryonic organogenesis. From a single fertilized microscopic cell, your baby develops all major body organs, a beating heart, tiny fingers, and facial features. For the mother, surges in hCG, progesterone, and estrogen trigger profound physiological adaptations.',
    keyHighlights: [
      'Fertilization and implantation into the uterine lining occur within the first 3 weeks',
      'The neural tube closes by week 5, creating the foundation for the brain and spinal cord',
      'The heart begins beating rhythmically around week 6',
      'All vital human organs (heart, brain, kidneys, liver, lungs) are formed by week 10',
      'Baby transitions from embryo to fetus and develops distinct fingernails and vocal cords'
    ],
    commonSymptoms: [
      {
        symptom: 'Morning Sickness & Queasiness',
        explanation: 'Rapidly rising levels of hCG and estrogen irritate gastric lining and heighten olfactory sensitivity.',
        remedy: 'Eat small, frequent protein-rich snacks. Keep crackers bedside, sip iced lemon water or ginger tea, and consider vitamin B6 after consulting your doctor.'
      },
      {
        symptom: 'Profound Fatigue & Exhaustion',
        explanation: 'Your body is constructing the placenta from scratch and adjusting to elevated progesterone and higher blood volume.',
        remedy: 'Prioritize 8–9 hours of sleep, take 20-minute afternoon naps, and decrease non-essential obligations.'
      },
      {
        symptom: 'Frequent Urination',
        explanation: 'Expanding blood volume puts extra filtration load on your kidneys, and the growing uterus presses against your bladder.',
        remedy: 'Stay thoroughly hydrated during daylight hours; lean slightly forward while urinating to empty bladder completely.'
      },
      {
        symptom: 'Breast Tenderness & Swelling',
        explanation: 'Hormonal priming of milk ducts and increased blood circulation to mammary tissues.',
        remedy: 'Wear supportive, wire-free cotton bras with wide straps and avoid tight, constricting clothing.'
      }
    ],
    essentialMedicalChecks: [
      'First Prenatal Intake Visit (usually around weeks 8–10): Medical history, vitals, blood type, Rh factor, iron levels, and rubella immunity',
      'Dating Ultrasound Scan: Confirms intrauterine location, measures crown-to-rump length (CRL), and pinpoints estimated due date',
      'Genetic Carrier & NIPT Screening (from week 10 onward): Optional blood test screening for chromosomal trisomies (21, 18, 13) and fetal sex',
      'Nuchal Translucency (NT) Scan (weeks 11–13): Measures fluid accumulation at the back of baby’s neck to assess chromosomal risks'
    ],
    doAndDont: {
      do: [
        'Take a daily prenatal multivitamin containing 400–800 mcg of folic acid and 200–300 mg of DHA',
        'Drink 2 to 2.5 liters of clean water daily to support expanding amniotic fluid and blood volume',
        'Wash all fruits and vegetables meticulously before eating',
        'Maintain gentle, low-impact exercise such as daily brisk walking or prenatal yoga'
      ],
      dont: [
        'Do not consume alcohol, smoke tobacco or marijuana, or use unprescribed recreational substances',
        'Avoid unpasteurized milk, soft cheeses (brie, camembert, feta unless pasteurized), and raw/undercooked eggs or meat',
        'Avoid high-mercury predatory fish (shark, swordfish, king mackerel, bigeye tuna)',
        'Do not use hot tubs, heated mineral baths, or saunas exceeding 100°F (38°C)'
      ]
    }
  },
  {
    trimester: 2,
    name: 'Second Trimester',
    weeksSpan: 'Weeks 14 to 27',
    theme: 'The Golden Trimester & First Kicks',
    overview:
      'Often described as the most comfortable and energizing chapter of pregnancy. Morning sickness usually recedes, hormonal surges level off, and your baby begins moving vigorously. You will likely feel baby’s first kicks (quickening), see detailed ultrasound views at your 20-week anatomy scan, and watch your baby bump blossom.',
    keyHighlights: [
      'Energy rebounds and morning nausea significantly diminishes for most mothers',
      'Quickening: Baby’s first fluttering kicks are felt between weeks 16 and 22',
      'Mid-pregnancy anatomy scan (week 18–20) thoroughly checks organ development and structural growth',
      'Baby can hear your voice, swallow fluid, suck thumbs, and react to bright light',
      'Reaching the 24-week viability milestone, where neonatal teams can support life outside the womb'
    ],
    commonSymptoms: [
      {
        symptom: 'Round Ligament Pain',
        explanation: 'Thick muscular bands supporting the growing uterus stretch and spasm during sudden movements or position shifts.',
        remedy: 'Change positions slowly, apply a warm compress to the lower belly, and try gentle cat-cow yoga stretches.'
      },
      {
        symptom: 'Mild Swelling (Edema) in Feet & Ankles',
        explanation: 'Increased vascular fluid and gravitational pooling in lower extremities after prolonged standing.',
        remedy: 'Elevate your feet in the evening, wear graduated compression stockings, and stay well-hydrated.'
      },
      {
        symptom: 'Heartburn & Acid Reflux',
        explanation: 'Progesterone relaxes the lower esophageal sphincter while the growing uterus presses against your stomach.',
        remedy: 'Eat smaller meals, avoid eating within 2 hours of bedtime, avoid spicy/greasy triggers, and elevate head of bed.'
      },
      {
        symptom: 'Leg Cramps (Especially at Night)',
        explanation: 'Fatigued calf muscles and temporary shifts in calcium and magnesium metabolism.',
        remedy: 'Flex your toes upward toward your shin when cramps strike, stay hydrated, and ask your doctor about magnesium.'
      }
    ],
    essentialMedicalChecks: [
      'Routine Checkups Every 4 Weeks: Fundal height measurement, maternal blood pressure, urine protein screen, and Doppler fetal heartbeat',
      'Comprehensive Anatomy Ultrasound (Level II Scan, weeks 18–22): Reviews baby’s brain, heart chambers, spine, kidneys, limbs, and placenta position',
      '1-Hour Glucose Tolerance Screening (weeks 24–28): Blood test to screen for gestational diabetes',
      'Complete Blood Count (CBC) Repeat: Screens for pregnancy-induced iron-deficiency anemia'
    ],
    doAndDont: {
      do: [
        'Sleep predominantly on your side (left side preferred) with a supportive pillow between your knees',
        'Consume plenty of calcium and iron-rich foods (leafy greens, legumes, seeds, lean meats)',
        'Moisturize stretching abdominal skin daily to alleviate dryness and itching',
        'Plan a babymoon or relaxing time with your partner while physical mobility is comfortable'
      ],
      dont: [
        'Avoid lying completely flat on your back for prolonged periods, which can compress the inferior vena cava',
        'Do not engage in contact sports, activities with fall risks (skiing, horseback riding), or heavy strain',
        'Avoid prolonged stationary standing; take frequent breaks to walk and circulate blood'
      ]
    }
  },
  {
    trimester: 3,
    name: 'Third Trimester',
    weeksSpan: 'Weeks 28 to 40+',
    theme: 'Final Growth & Welcoming Baby',
    overview:
      'The final stretch is dedicated to rapid fetal weight gain and physiological preparation for delivery. Baby packs on insulating fat, matures lung surfactant, and practices breathing. For the expectant mother, prenatal appointments become more frequent as your body readies for labor, nesting instincts awaken, and the big day approaches.',
    keyHighlights: [
      'Baby gains roughly half a pound (220 grams) each week during the final month',
      'Baby settles head-down (vertex) in the pelvis in preparation for birth',
      'Maternal antibodies transfer across the placenta to confer newborn immune protection',
      'Lungs mature and produce ample surfactant to sustain air breathing',
      'Reaching early term at week 37 and full term at week 39'
    ],
    commonSymptoms: [
      {
        symptom: 'Braxton Hicks Practice Contractions',
        explanation: 'Painless, irregular tightening of the uterine muscle preparing the cervix for labor.',
        remedy: 'Drink a large glass of water, rest on your side, take a warm shower, and practice calm breathing.'
      },
      {
        symptom: 'Shortness of Breath',
        explanation: 'The fundus of the uterus reaches its highest point just below the sternum, compressing the diaphragm.',
        remedy: 'Maintain upright posture, practice ribcage expansion breathing, and rest frequently. Relief comes when baby "drops".'
      },
      {
        symptom: 'Pelvic Pressure & Frequent Urination',
        explanation: 'Baby’s head drops into the pelvic inlet ("lightening"), pressing directly against the bladder and pelvic floor.',
        remedy: 'Perform gentle pelvic tilts on a birth ball; wear a supportive maternity belt to distribute pelvic weight.'
      },
      {
        symptom: 'Sleep Disruption & Physical Restlessness',
        explanation: 'Large belly size, frequent bathroom trips, and eager anticipation of labor.',
        remedy: 'Build a pillow nest for support, establish a relaxing screen-free evening routine, and take naps when tired.'
      }
    ],
    essentialMedicalChecks: [
      'Frequent Prenatal Visits: Every 2 weeks from week 28–36, then weekly from week 36 until birth',
      'RhoGAM Injection (at week 28): Administered to Rh-negative mothers to prevent maternal antibody sensitization',
      'Tdap Booster Vaccine (weeks 27–36): Passes vital pertussis (whooping cough) antibodies to protect newborn',
      'Group B Streptococcus (GBS) Screening (weeks 35–37): Simple vaginal-rectal swab to identify need for IV antibiotics during labor',
      'Cervical Checks & Fetal Presentation (weeks 36–40): Confirms baby is positioned head-down and monitors cervical effacement/dilation'
    ],
    doAndDont: {
      do: [
        'Practice daily fetal kick counts (e.g. 10 distinct movements within a 2-hour quiet evening window)',
        'Pack your hospital or birthing center bag with essentials for mom, partner, and newborn',
        'Install and inspect your certified infant car seat well before week 37',
        'Review your labor preferences, birth team communication, and post-birth postpartum support plans'
      ],
      dont: [
        'Do not ignore signs of preterm labor, such as rhythmic tightening every 5 minutes, watery leakage, or vaginal bleeding',
        'Do not hesitate to contact your labor and delivery triage if you notice a significant decrease in fetal movement',
        'Avoid overworking or exhausting yourself during sudden bursts of nesting energy'
      ]
    }
  }
];

export const WHEN_TO_CALL_DOCTOR = [
  'Any bright red vaginal bleeding or spotting',
  'Sudden gush or continuous trickle of clear/pinkish fluid (potential water breaking)',
  'Noticeable decrease or cessation in baby’s normal movement patterns after 24 weeks',
  'Severe, persistent abdominal pain or cramping that doesn’t ease with rest',
  'Persistent severe headache, sudden visual disturbances (spots/flashes), or acute face/hand swelling (signs of preeclampsia)',
  'High fever (over 100.4°F / 38°C) or severe chills',
  'Pain, burning, or blood during urination',
  'Regular, painful uterine contractions before 37 weeks (preterm labor)'
];
