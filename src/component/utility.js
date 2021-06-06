import playerMap1 from '../assets/Play/PlayerMaps_1.svg'
import playerMap2 from '../assets/Play/PlayerMaps_2.svg'
import playerMap3 from '../assets/Play/PlayerMaps_3.svg'
import playerMap4 from '../assets/Play/PlayerMaps_4.svg'
import playerIcon1 from '../assets/Home-Setting/Player_1.svg'
import playerIcon2 from '../assets/Home-Setting/Player_2.svg'
import playerIcon3 from '../assets/Home-Setting/Player_3.svg'
import playerIcon4 from '../assets/Home-Setting/Player_4.svg'

export const selectPositionPlayer = index =>{
    switch (index) {
        case 0: return{posLeft:10,posBottom:10}
        case 1: return{posLeft:40,posBottom:10}
        case 2: return{posLeft:10,posBottom:45}
        case 3: return{posLeft:40,posBottom:45}
        default:return{posLeft:10,posBottom:10}
    }
}
export const selectPlayerIcon = index =>{
    switch (index) {
        case 0: return playerIcon1
        case 1: return playerIcon2
        case 2: return playerIcon3
        case 3: return playerIcon4
        default:return playerIcon1
    }
}
export const selectPlayerMap = index =>{
    switch (index) {
        case 0: return playerMap1
        case 1: return playerMap2
        case 2: return playerMap3
        case 3: return playerMap4
        default:return playerMap1
    }
}