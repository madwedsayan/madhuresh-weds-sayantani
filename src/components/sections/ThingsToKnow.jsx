import { motion } from 'framer-motion'
import { IconHashtag, IconParking, IconWeather } from '../motifs/Icons'
import { ChikanSpray, Toran } from '../motifs/Motifs'
import config from '../../config/inviteConfig'

const icons = { hashtag: IconHashtag, weather: IconWeather, parking: IconParking }

export default function ThingsToKnow() {
  return (
    <section className="texture relative overflow-hidden px-6 pb-24 pt-28 md:pb-32 md:pt-36" style={{ background: 'var(--things-bg)', color: 'var(--things-fg)' }}>
      <Toran className="pointer-events-none absolute inset-x-0 top-0 h-[70px] w-full md:h-[90px]" />
      <ChikanSpray className="pointer-events-none absolute -bottom-4 -right-8 w-64 -scale-x-100" color="white" opacity={0.5} />
      <ChikanSpray className="pointer-events-none absolute -left-8 top-24 w-56" color="white" opacity={0.5} />

      <div className="relative mx-auto max-w-5xl text-center">
        <h2 className="font-display text-4xl tracking-[0.12em] md:text-6xl">THINGS TO KNOW</h2>
        <p className="mt-2 font-serif text-lg italic opacity-80">A few little details for our dear guests</p>

        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {config.thingsToKnow.map((item, i) => {
            const Icon = icons[item.icon] || IconHashtag
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: i * 0.12 }}
                className="flex flex-col items-center"
              >
                <motion.div whileHover={{ rotateY: 180 }} transition={{ duration: 0.8 }} className="grid h-20 w-20 place-items-center" style={{ transformStyle: 'preserve-3d' }}>
                  <Icon className="h-16 w-16" />
                </motion.div>
                <h3 className="mt-4 font-display text-xl tracking-[0.18em]">{item.title.toUpperCase()}</h3>
                <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed opacity-85">{item.text}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
