<script setup>
import PageContainer from '@/components/ui/PageContainer.vue'
</script>

<template>
    <PageContainer class="py-10 pb-16 md:py-14">
        <article class="mx-auto max-w-3xl">
            <header class="mb-10 border-b border-slate-200/95 pb-8">
                <p class="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-primary">Legal</p>
                <h1 class="mt-3 text-3xl font-bold tracking-tight text-secondary md:text-4xl">Privacy policy</h1>
                <p class="mt-3 text-sm text-slate-600">
                    Effective date: May 12, 2026. This policy describes how Free Games Hub ("we," "our," or "us") handles
                    information when you use our website at the domain where this policy is hosted.
                </p>
            </header>

            <div class="space-y-8 text-[0.9375rem] leading-relaxed text-slate-700">
                <section>
                    <h2 class="mb-3 text-xl font-semibold tracking-tight text-secondary">Overview</h2>
                    <p>
                        Free Games Hub is an informational catalogue that helps you discover free-to-play games. Where
                        practical, we keep data collection lightweight. Certain features rely on reputable third-party
                        services (for example, game catalogue data from FreeToGame and optional authentication with
                        Google Firebase), each of which has its own policies.
                    </p>
                </section>

                <section>
                    <h2 class="mb-3 text-xl font-semibold tracking-tight text-secondary">Information we process</h2>
                    <p class="mb-4">Depending on how you use the site, we or our processors may handle:</p>
                    <ul class="list-disc space-y-2 ps-6">
                        <li>
                            <span class="font-medium text-secondary">Technical &amp; security data:</span>
                            Typical web server or hosting logs such as approximate location derived from IP, user agent,
                            timestamps, or error diagnostics. Hosting providers retain these according to their own
                            retention policies.
                        </li>
                        <li>
                            <span class="font-medium text-secondary">Account data (optional):</span>
                            If you create an account, Firebase Authentication typically stores identifiers such as your
                            email address, hashed password (for email/password sign-in), and profile UID. Google sign-in is
                            subject to Google's terms and privacy disclosures.
                        </li>
                        <li>
                            <span class="font-medium text-secondary">Local storage in your browser:</span>
                            The site may persist small amounts of session or preference metadata (for example, auth state or
                            UI choices) strictly to keep the interface working smoothly.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 class="mb-3 text-xl font-semibold tracking-tight text-secondary">Third-party content &amp; APIs</h2>
                    <p>
                        Game descriptions, thumbnails, storefront links, and related metadata originate from independent
                        publishers and distributors via the FreeToGame service. Visiting external game sites occurs under
                        each destination's privacy practices. Firebase services are governed by Google's policies applicable
                        to Firebase products.
                    </p>
                </section>

                <section>
                    <h2 class="mb-3 text-xl font-semibold tracking-tight text-secondary">Cookies and similar tech</h2>
                    <p class="mb-4">
                        We mirror your consent choice into both browser storage types so preferences survive reloads and can
                        be read consistently by the running app:
                    </p>
                    <ul class="mb-4 list-disc space-y-2 ps-6">
                        <li>
                            <span class="font-medium text-secondary">Local storage:</span>
                            key <span class="font-mono text-sm text-slate-800">fgh_cookie_consent_v1</span> holds the banner
                            version, optional/analytics toggle, and a timestamp for debugging support.
                        </li>
                        <li>
                            <span class="font-medium text-secondary">First-party HTTP cookies:</span>
                            <span class="font-mono text-sm text-slate-800">fgh_cookie_essential</span> marks that essential /
                            consent scaffolding is active and <span class="font-mono text-sm text-slate-800">fgh_cookie_prefs</span>
                            encodes the same preference snapshot in a compact form (typically up to roughly 13&nbsp;months).
                            They use <span class="font-mono text-sm text-slate-800">SameSite=Lax</span>, <span class="font-mono text-sm text-slate-800">Path=/</span>, and include
                            <span class="font-mono text-sm text-slate-800">Secure</span> on HTTPS deployments.
                        </li>
                        <li>
                            <span class="font-medium text-secondary">Optional analytics:</span>
                            When the site operator configures a Google Analytics 4 property and you opt in, the app may load
                            Google tagging from <span class="font-mono text-sm text-slate-800">googletagmanager.com</span> and set
                            first-party GA cookies managed by Google. You can revoke consent via the banner (when surfaced),
                            by clearing site data, or by toggling off optional analytics if the operator surfaces that control
                            again; rejecting optional cookies triggers a best-effort clear of common GA cookie names
                            (<span class="font-mono text-sm text-slate-800">_ga</span>, <span class="font-mono text-sm text-slate-800">_gid</span>).
                        </li>
                    </ul>
                    <p>
                        Firebase Authentication and session continuity may still rely on storage that is strictly necessary
                        for sign-in. We do not deploy invasive cross-site advertising trackers through this codebase; if
                        integrations change, we will revise this disclosure.
                    </p>
                </section>

                <section>
                    <h2 class="mb-3 text-xl font-semibold tracking-tight text-secondary">Children's privacy</h2>
                    <p>
                        The service is aimed at general audiences. We do not knowingly collect personally identifiable data
                        from children under applicable age thresholds beyond what incidental technical logging may entail.
                        If you believe we have mistakenly collected child's data, contact us promptly so we can delete it.
                    </p>
                </section>

                <section>
                    <h2 class="mb-3 text-xl font-semibold tracking-tight text-secondary">Your choices &amp; rights</h2>
                    <p>
                        Subject to jurisdictional allowances, you may request access to, correction of, or deletion of profile
                        data held in Firebase Authentication. You can also discontinue use at any time, clear site data
                        via your browser, or revoke connected accounts through your Firebase-linked provider dashboards.
                    </p>
                </section>

                <section>
                    <h2 class="mb-3 text-xl font-semibold tracking-tight text-secondary">Updates</h2>
                    <p>
                        We may revise this privacy policy periodically. Continuing to use Free Games Hub after revisions are
                        posted constitutes acceptance unless a stricter regime requires affirmative consent where mandated.
                        The effective date atop this document signals the latest substantive review.
                    </p>
                </section>

                <section>
                    <h2 class="mb-3 text-xl font-semibold tracking-tight text-secondary">Contact</h2>
                    <p class="mb-4">
                        For privacy questions, please reach out through whichever official contact channel the site
                        operator publishes for this deployment (for example, a support email or project repository link).
                        If no channel is listed, contact the hosting organization responsible for this build.
                    </p>
                </section>
            </div>
        </article>
    </PageContainer>
</template>
