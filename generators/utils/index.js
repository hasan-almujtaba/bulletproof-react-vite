import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { cwd } from 'node:process'

export const featureLocation = 'src/features'
export const featuresDir = join(cwd(), featureLocation)
export const features = readdirSync(featuresDir)
