import { ArrowLink } from "@/components/primitives/ArrowLink";
import { ParallaxImage } from "@/components/primitives/ParallaxImage";
import { Reveal } from "@/components/primitives/Reveal";
import { RevealLines } from "@/components/primitives/RevealLines";
import { SectionHead } from "@/components/primitives/SectionHead";
import { PROJECTS, type Project } from "@/lib/content";

/** Each project sits at a different height in its row, so the page never
 *  settles into a rhythm of identical blocks. */
const ALIGNMENT = [
  "lg:self-end lg:pb-[3vw]",
  "lg:self-start lg:pt-[4vw]",
  "lg:self-center",
];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1;

  return (
    <article className="grid-12 items-center gap-y-9">
      <Reveal
        className={[
          "col-span-6 lg:row-start-1",
          flipped ? "lg:col-span-6 lg:col-start-7" : "lg:col-span-6 lg:col-start-1",
        ].join(" ")}
        distance={0}
      >
        <ParallaxImage
          src={project.image}
          alt={project.imageAlt}
          className="aspect-[4/5] w-full sm:aspect-[16/11] lg:aspect-[4/5]"
          sizes="(min-width: 1024px) 50vw, 100vw"
          amount={6}
        />
      </Reveal>

      <div
        className={[
          "col-span-6 lg:row-start-1",
          ALIGNMENT[index % ALIGNMENT.length],
          flipped
            ? "lg:col-span-4 lg:col-start-2"
            : "lg:col-span-4 lg:col-start-8",
        ].join(" ")}
      >
        <Reveal distance={22}>
          <p className="label border-t rule pt-5 opacity-60">{project.index}</p>

          <h3 className="mt-8 display text-h2 uppercase leading-[0.95]">
            {project.name}
          </h3>

          <p className="mt-4 label opacity-60">{project.location}</p>

          <p className="mt-8 max-w-[40ch] text-body opacity-65">
            {project.description}
          </p>

          <dl className="mt-10 grid max-w-[26rem] grid-cols-2 gap-x-6 border-t rule pt-5">
            <div>
              <dt className="label opacity-60">Asset class</dt>
              <dd className="mt-2 text-small">{project.assetClass}</dd>
            </div>
            <div>
              <dt className="label opacity-60">Status</dt>
              <dd className="mt-2 text-small">{project.status}</dd>
            </div>
          </dl>

          <ArrowLink href={project.href} className="mt-11">
            View project
          </ArrowLink>
        </Reveal>
      </div>
    </article>
  );
}

export function Opportunities() {
  return (
    <section
      id="opportunities"
      className="scroll-mt-20 bg-paper text-ink"
    >
      <div className="shell section-pad">
        <SectionHead
          index="03"
          label="Portfolio"
          aside="A representative selection, 2025 — 2028"
        />

        <div className="grid-12 mt-[clamp(2.5rem,5vw,4.5rem)] items-end gap-y-9">
          <RevealLines
            lines={["Selected", "Opportunities"]}
            className="col-span-6 display display-tight text-h1 uppercase lg:col-span-7"
          />
          <Reveal
            className="col-span-6 lg:col-span-4 lg:col-start-9"
            delay={0.12}
          >
            <p className="max-w-[36ch] text-body opacity-65">
              We hold a deliberately short list. Each position is underwritten
              on its own terms and reported on individually to our partners.
            </p>
          </Reveal>
        </div>

        <div className="mt-[clamp(4.5rem,11vw,11rem)] space-y-[clamp(5.5rem,13vw,13rem)]">
          {PROJECTS.map((project, index) => (
            <ProjectRow key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
