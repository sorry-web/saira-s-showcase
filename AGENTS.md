<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application rules
- Keep the presentation at `/` with scene data separated from visual components so the single-control experience and presenter scripts stay coherent.
- Keep all image assets as Vite imports; this bundles portable hashed assets instead of relying on third-party image hosts.
- Initialize Three.js and GSAP through dynamic imports inside effects, disposing animations and render resources on unmount, so SSR and reduced-motion remain safe.
- Select Nitro's Vercel preset only when VERCEL is set; preserve the default Lovable deployment target elsewhere.
