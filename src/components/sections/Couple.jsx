import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ArchFrame from '../motifs/Arch'
import { CoupleArt } from '../motifs/EventArt'
import { AlponaDivider, AlponaLotus, ChikanSpray, Kite, Shankha } from '../motifs/Motifs'
import config from '../../config/inviteConfig'

function PersonCard({ person, role, emblem, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className="relative overflow-hidden rounded-[32px] border px-6 py-8 text-center"
      style={{ borderColor: 'var(--gold)', background: 'color-mix(in srgb, var(--paper) 55%, transparent)' }}
    >
      <div className="jaali pointer-events-none absolute inset-0 opacity-40" />
      <p className="relative font-display text-xs tracking-[0.5em] opacity-70">{role}</p>
      <div className="relative mx-auto my-3 grid h-16 w-16 place-items-center rounded-full border" style={{ borderColor: 'var(--gold)' }}>
        {emblem}
      </div>
      {person.image && <img src={person.image} alt={person.name} className="relative mx-auto mb-3 h-28 w-28 rounded-full object-cover" loading="lazy" />}
      <h3 className="relative font-script text-5xl leading-tight">{person.name}</h3>
      <p className="relative mt-1 font-sans text-[11px] uppercase tracking-[0.3em] opacity-70">
        {person.city}, {person.state}
      </p>
      <p className="relative mt-4 font-serif text-lg italic leading-snug opacity-90">{person.about}</p>
    </motion.div>
  )
}

export default function Couple() {
  const { groom, bride } = config.couple
  const { welcome } = config
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const archY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const lotusRot = useTransform(scrollYProgress, [0, 1], [0, 90])

  return (
    <section ref={ref} className="texture relative overflow-hidden px-6 py-24 md:py-32" style={{ background: 'var(--couple-bg)', color: 'var(--couple-fg)' }}>
      {/* Alpona + chikan borders */}
      <div className="pointer-events-none absolute inset-x-0 top-4 opacity-60">
        <AlponaDivider color="white" />
      </div>
      <motion.div className="pointer-events-none absolute -left-24 top-1/3 opacity-25" style={{ rotate: lotusRot }}>
        <AlponaLotus size={260} color="white" animate={false} />
      </motion.div>
      <motion.div className="pointer-events-none absolute -right-24 bottom-10 opacity-25" style={{ rotate: lotusRot }}>
        <AlponaLotus size={240} color="white" animate={false} />
      </motion.div>
      <ChikanSpray className="pointer-events-none absolute bottom-0 left-1/2 w-72 -translate-x-1/2 opacity-50" />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <p className="font-sans text-xs uppercase tracking-[0.45em] opacity-70">Meet the</p>
          <h2 className="mt-2 font-display text-4xl tracking-[0.1em] md:text-6xl">Bride &amp; Groom</h2>
        </div>

        <div className="mt-12 grid items-center gap-12 md:grid-cols-2">
          <motion.div className="tilt-scene mx-auto w-[min(78vw,380px)]" style={{ y: archY }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
              className="relative"
            >
              <ArchFrame image={welcome.coupleImage} label={welcome.coupleImageLabel} w={300} h={400} lobes={11}>
                <CoupleArt />
              </ArchFrame>
              {!welcome.coupleImage && (
                <p className="mt-3 text-center font-sans text-[10px] uppercase tracking-[0.2em] opacity-60">{welcome.coupleImageLabel}</p>
              )}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="text-center md:text-left">
            <h3 className="font-serif text-3xl italic md:text-4xl">{welcome.heading}</h3>
            <p className="mt-4 font-serif text-xl leading-relaxed opacity-90">{welcome.message}</p>
            <p className="mt-6 font-display text-sm tracking-[0.3em]">
              {groom.name.toUpperCase()} <span style={{ color: 'var(--sindoor)' }}>✦</span> {bride.name.toUpperCase()}
            </p>
          </motion.div>
        </div>

        <div className="tilt-scene mt-16 grid gap-6 md:grid-cols-2">
          <PersonCard
            person={groom}
            role="THE GROOM"
            delay={0}
            emblem={<Kite className="h-10 w-6" color="var(--sindoor)" color2="var(--gold)" />}
          />
          <PersonCard person={bride} role="THE BRIDE" delay={0.15} emblem={<Shankha className="h-9 w-9" />} />
        </div>
      </div>
    </section>
  )
}
