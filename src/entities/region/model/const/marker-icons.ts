import AlertFilled from "@/shared/assets/icons/alert.svg?url"
import BattleIcon from "@/shared/assets/icons/battle.svg?url"
import NoneIcon from "@/shared/assets/icons/none.svg?url"
import CapturedIcon from "@/shared/assets/icons/captured.svg?url"
import MilitaryPlaneIcon from "@/shared/assets/icons/military-plane.svg?url"
import DroneIcon from "@/shared/assets/icons/drone.svg?url"
import StatementIcon from "@/shared/assets/icons/statement.svg?url"
import SupplyIcon from "@/shared/assets/icons/supply.svg?url"
import FiresIcon from "@/shared/assets/icons/fires.svg?url"
import PoliceIcon from "@/shared/assets/icons/police.svg?url"
import GunIcon from "@/shared/assets/icons/gun.svg?url"
import FloodIcon from "@/shared/assets/icons/flood.svg?url"
import ArrestIcon from "@/shared/assets/icons/arrest.svg?url"
import EarthquakeIcon from "@/shared/assets/icons/earthquake.svg?url"
import CivilPlaneIcon from "@/shared/assets/icons/civil-plane.svg?url"
import ComputersIcon from "@/shared/assets/icons/computers.svg?url"
import ElectricityIcon from "@/shared/assets/icons/electricity.svg?url"
import RadioactiveIcon from "@/shared/assets/icons/radioactive.svg?url"
import ExplosionIcon from "@/shared/assets/icons/explosion.svg?url"
import StopIcon from "@/shared/assets/icons/stop.svg?url"

export const MARKER_TYPES = {
   battle: "battle",
   none: "none",
   alert: "alert",
   captured: "captured",
   militaryPlane: "militaryPlane",
   drone: "drone",
   statement: "statement",
   supply: "supply",
   fires: "fires",
   police: "police",
   gun: "gun",
   flood: "flood",
   arrest: "arrest",
   earthquake: "earthquake",
   civilPlane: "civilPlane",
   computers: "computers",
   electricity: "electricity",
   radioactive: "radioactive",
   explosion: "explosion",
   stop: "stop",
} as const

type MarkerIcon = {
   id: number
   icon: string
   type: keyof typeof MARKER_TYPES
   desc: string
}

export const MARKER_ICONS: Record<keyof typeof MARKER_TYPES, MarkerIcon> = {
   none: {
      id: 1,
      icon: NoneIcon,
      type: "none",
      desc: "Empty",
   },
   battle: {
      id: 2,
      icon: BattleIcon,
      type: "battle",
      desc: "Battle, armed man",
   },
   alert: {
      id: 3,
      icon: AlertFilled,
      type: "alert",
      desc: "Alert, warning",
   },
   captured: {
      id: 4,
      icon: CapturedIcon,
      type: "captured",
      desc: "Captured",
   },
   militaryPlane: {
      id: 5,
      icon: MilitaryPlaneIcon,
      type: "militaryPlane",
      desc: "Military plane",
   },
   drone: {
      id: 6,
      icon: DroneIcon,
      type: "drone",
      desc: "Drone",
   },
   statement: {
      id: 7,
      icon: StatementIcon,
      type: "statement",
      desc: "Statement",
   },
   supply: {
      id: 8,
      icon: SupplyIcon,
      type: "supply",
      desc: "Supply",
   },
   fires: {
      id: 9,
      icon: FiresIcon,
      type: "fires",
      desc: "Fires",
   },
   police: {
      id: 10,
      icon: PoliceIcon,
      type: "police",
      desc: "Police",
   },
   gun: {
      id: 11,
      icon: GunIcon,
      type: "gun",
      desc: "Gun",
   },
   flood: {
      id: 12,
      icon: FloodIcon,
      type: "flood",
      desc: "Flood",
   },
   arrest: {
      id: 13,
      icon: ArrestIcon,
      type: "arrest",
      desc: "Arrest",
   },
   earthquake: {
      id: 14,
      icon: EarthquakeIcon,
      type: "earthquake",
      desc: "Earthquake",
   },
   civilPlane: {
      id: 15,
      icon: CivilPlaneIcon,
      type: "civilPlane",
      desc: "Civil Airplane",
   },
   computers: {
      id: 16,
      icon: ComputersIcon,
      type: "computers",
      desc: "Computers, hackers",
   },
   electricity: {
      id: 17,
      icon: ElectricityIcon,
      type: "electricity",
      desc: "Electricity, power",
   },
   radioactive: {
      id: 18,
      icon: RadioactiveIcon,
      type: "radioactive",
      desc: "Radioactive, nuke",
   },
   explosion: {
      id: 19,
      icon: ExplosionIcon,
      type: "explosion",
      desc: "Explosion",
   },
   stop: {
      id: 20,
      icon: StopIcon,
      type: "stop",
      desc: "Stop",
   },
}
