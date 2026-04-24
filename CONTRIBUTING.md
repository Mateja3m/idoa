# Contributing

Contributions are welcome. This project focuses on onboarding diagnostics and CLI tooling, with `idoa doctor` as the main command surface.

## Development setup

```sh
git clone https://github.com/Mateja3m/idoa
cd idoa
npm install
npm run build
npm run doctor
```

## Workflow

Do not commit directly to `main`.

Create a new branch from `main`:

```sh
git checkout -b feat/your-feature-name
```

Make your changes and commit them locally.

If your workflow requires a sign-off, use `git commit -s` so the commit includes a `Signed-off-by` trailer.

Push your branch:

```sh
git push origin your-branch
```

Open a Pull Request and wait for approval before merge.

## Contribution guidelines

- Keep changes small and focused.
- Follow the existing project structure.
- Avoid adding unnecessary dependencies.
- Keep output deterministic: `PASS`, `WARN`, and `FAIL`.

## Issues

For larger changes, open an issue first so the scope and direction can be discussed before implementation.
