<script setup>
import PageContainer from '@/components/ui/PageContainer.vue'
import Link from '@/components/ui/Link.vue'
</script>

<template>
    <PageContainer class="py-10 pb-16 md:py-14">
        <article class="mx-auto max-w-3xl">
            <header class="mb-10 border-b border-slate-200/95 pb-8">
                <p class="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-primary">Legal</p>
                <h1 class="mt-3 text-3xl font-bold tracking-tight text-secondary md:text-4xl">Terms of use</h1>
                <p class="mt-3 text-sm text-slate-600">
                    Effective date: May 12, 2026. By accessing or using Free Games Hub ("the Service"), you agree to these
                    terms. If you disagree, please discontinue use.
                </p>
            </header>

            <div class="space-y-8 text-[0.9375rem] leading-relaxed text-slate-700">
                <section>
                    <h2 class="mb-3 text-xl font-semibold tracking-tight text-secondary">Service description</h2>
                    <p>
                        The Service provides discovery tools, listings, and links related to free-to-play games. Content is
                        compiled from third-party sources and may change without notice. We do not guarantee availability,
                        accuracy, or licensing of any particular title; publishers control distribution, pricing, and
                        availability on their own platforms.
                    </p>
                </section>

                <section>
                    <h2 class="mb-3 text-xl font-semibold tracking-tight text-secondary">Accounts</h2>
                    <p>
                        Optional sign-in features may be offered for convenience. You are responsible for safeguarding
                        credentials, for activity under your account, and for compliance with any provider-specific terms
                        (such as Google or Firebase). We may suspend or terminate access if we reasonably suspect abuse,
                        fraud, or risk to the Service.
                    </p>
                </section>

                <section>
                    <h2 class="mb-3 text-xl font-semibold tracking-tight text-secondary">Acceptable use</h2>
                    <p class="mb-4">You agree not to:</p>
                    <ul class="list-disc space-y-2 ps-6">
                        <li>Attempt to disrupt, overload, reverse engineer, or exploit the Service or its infrastructure.</li>
                        <li>
                            Scrape, harvest, or automate access in a way that interferes with normal operation or violates
                            upstream API terms (including those of
                            <Link
                                url="https://freetogame.com/"
                                class="font-semibold text-primary underline decoration-transparent underline-offset-2 hover:text-secondary hover:decoration-secondary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                FreeToGame
                            </Link>
                            ).
                        </li>
                        <li>Upload malicious code, harass others using any future community surfaces, or break applicable law.</li>
                    </ul>
                </section>

                <section>
                    <h2 class="mb-3 text-xl font-semibold tracking-tight text-secondary">Third-party websites &amp; games</h2>
                    <p>
                        Listings reference external storefronts or publishers. Your relationship with those services is solely
                        between you and the third party (including installs, registrations, telemetry, monetization,
                        moderation, refunds, etc.). Mention in the catalogue is not endorsement of any particular site or title.
                    </p>
                </section>

                <section>
                    <h2 class="mb-3 text-xl font-semibold tracking-tight text-secondary">Disclaimer of warranties</h2>
                    <p>
                        The Service is provided on an <span class="font-semibold text-secondary">"AS IS"</span> and{' '}
                        <span class="font-semibold text-secondary">"AS AVAILABLE"</span> basis, without warranties of any kind,
                        whether express or implied, including merchantability, fitness for a particular purpose,
                        uninterrupted access, error-free listings, or that games remain free indefinitely.
                    </p>
                </section>

                <section>
                    <h2 class="mb-3 text-xl font-semibold tracking-tight text-secondary">Limitation of liability</h2>
                    <p>
                        To the maximum extent permitted by law, neither Free Games Hub nor its contributors will be liable for
                        indirect, incidental, special, consequential, or punitive damages, or lost profits arising from use of
                        the Service or reliance on its content. Aggregate liability shall not exceed the greater of fifty
                        euros (EUR 50) or the amounts you paid to us specifically for premium features in the preceding twelve
                        months (currently zero unless otherwise stated elsewhere).
                    </p>
                </section>

                <section>
                    <h2 class="mb-3 text-xl font-semibold tracking-tight text-secondary">Intellectual property</h2>
                    <p>
                        Game names, screenshots, logos, and marketing materials referenced in listings remain the property of
                        their respective owners. Except for our branding and original layout, we claim no ownership over such
                        third-party materials and include them purely for factual discovery consistent with customary fair-use
                        or licensing terms communicated by catalogue providers.
                    </p>
                </section>

                <section>
                    <h2 class="mb-3 text-xl font-semibold tracking-tight text-secondary">Changes &amp; termination</h2>
                    <p>
                        Features, APIs, integrations, or this policy may evolve. Updates will generally be communicated by
                        revising documents on-site. We may discontinue the Service altogether; where feasible we will strive to
                        provide reasonable notice ahead of impactful shutdowns.
                    </p>
                </section>

                <section>
                    <h2 class="mb-3 text-xl font-semibold tracking-tight text-secondary">Governing law</h2>
                    <p>
                        Unless mandatory local law requires otherwise, these terms are governed by the laws of the jurisdiction
                        in which the site operator is established, without regard to conflict-of-law principles. Courts in that
                        jurisdiction have non-exclusive venue, but nothing prevents you from invoking mandatory consumer
                        protections that apply where you live.
                    </p>
                </section>
            </div>
        </article>
    </PageContainer>
</template>
