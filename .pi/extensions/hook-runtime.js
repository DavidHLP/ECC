const path = require("node:path")

/**
 * Select a real Node executable for hook scripts.
 *
 * Compiled OMP/Bun exposes a Node-compatible process.release.name, but its
 * process.execPath points to the OMP launcher. Use PATH node in that case;
 * ECC_HOOK_NODE provides an explicit path for systems without Node on PATH.
 */
function resolveHookRuntime({
  execPath = process.execPath,
  releaseName = process.release?.name,
  bunVersion = process.versions?.bun,
  override = process.env.ECC_HOOK_NODE,
} = {}) {
  const isNodeRuntime =
    releaseName === "node" &&
    !bunVersion &&
    /^(?:node|nodejs)(?:\.exe)?$/i.test(path.basename(execPath))
  return override?.trim() || (isNodeRuntime ? execPath : "node")
}

module.exports = { resolveHookRuntime }
