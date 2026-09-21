---
name: dockerfile-optimizer
description: "Review or optimize a Dockerfile for image size, caching and runtime reliability. Use for container build changes, not unrelated deployment or Kubernetes troubleshooting."
---

# Dockerfile Optimizer

Use the requested language. Read the Dockerfile and relevant manifests, lockfiles,
ignore files and runtime constraints. Preserve the package manager, runtime
version, entrypoint, signals, ports, platform and required assets unless the
requested change includes altering them.

## Optimize without changing required behavior

- Copy dependency manifests before frequently changing source when install steps
  do not need source. Include workspace metadata and lockfiles required by the
  actual package manager; respect lifecycle scripts and production dependencies.
- Use multi-stage builds when build tools can be removed from the runtime.
  Check CGO/shared libraries, libc, certificates, time zones and runtime data
  before choosing scratch, Alpine or distroless. Smaller is not automatically
  compatible, and switching distro/runtime major version is a separate decision.
- Combine apt update/install/cleanup in one layer; avoid retaining secrets in
  build arguments or layers. Preserve relevant build caches with scoped mounts
  when supported. Fewer RUN instructions alone do not prove faster builds.
- For non-root execution, establish file ownership, writable directories and
  required privileges. Do not simply add USER and assume the app still starts.
- Keep the build context narrow through .dockerignore without excluding needed
  manifests, assets or workspace packages.

## Validate the result

Provide the revised file and reasons tied to actual constraints. When tools and
scope permit, build for the target platform, start the container, and check the
representative health/functional path (including TLS and writes when relevant).
Measure image size and cold/warm build time before claiming improvements. If
Docker or fixtures are unavailable, list the unverified checks and do not present
estimated benefits as measured results. Diagnose failed startup before accepting
an image-size win. Follow repository test conventions rather than adding tests
that only match Dockerfile text.
