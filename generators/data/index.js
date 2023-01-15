import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { cwd } from 'node:process'

export const templateDir = 'generators/templates/'

export const featureDir = 'src/features/'
export const featuresPath = join(cwd(), featureDir)
export const features = readdirSync(featuresPath)

export const componentDir = 'src/components/'
export const hooksDir = 'src/hooks/'
