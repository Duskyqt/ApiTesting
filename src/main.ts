import axios from "axios";

interface ITalent {
    name: string,
    id: number,
    icon: string,
}
interface IAzeritePower {
    name: string,
    id: number,
    icon: string,
    ring: number
}
interface IGear {
    name: string,
    quality: string,
    id: number,
    icon: string,
    itemLevel: string,
    permanentEnchant: string,
    temporaryEnchant: string,
    onUseEnchant: string,
    bonusIDs: string[],
    gems: IGem[]
}
interface IGem {
    id: string,
    itemLevel: string
}
interface IEssencePower {
    name: string,
    id: number,
    icon: string,
}
interface ICorruptions {
    activePowers: { 
        id: number,
        corruption: number,
        icon: string,
        name: string,
    }[],
    passivePowers: { 
        id: number,
        corruption: number,
        icon: string,
        name: string,
    }[],
    cloakResist: number,
    corruptionFromPowers: number,
}

interface IRanking {
    encounterID: number,
    encounterName: string,
    class: string,
    spec: string,
    rank: number,
    outOf: number,
    duration: number,
    startTime: number,
    reportID: string,
    fightID: number,
    characterID: number,
    characterName: string,
    server: string,
    percentile: number,
    ilvlKeyOrPatch: number,
    talents: ITalent[],
    gear: IGear[],
    azeritePowers: IAzeritePower[],
    corruption: ICorruptions 
    essencePower: IEssencePower[],
    total: number,
    estimated: number,

}
function GetRankings(charName: string, serverName: string, serverRegion: string) {

   const Request = axios.get("https://www.warcraftlogs.com/v1/rankings/character/" + charName + "/" + serverName + "/" + serverRegion + "?api_key=2d74dc0acfd5ab85620fd8e8fe669c3b")
   .then( (response) => {
    const data: IRanking[] = response.data;
    let avg = 0;
    for (let i = 0; i < data.length; i++) {
        const ThisFight = data[i];
        avg = avg + ThisFight.percentile;
        console.log(ThisFight.encounterName, Math.floor(ThisFight.percentile));
    }
    console.log(avg / data.length)
   })
   .catch( (error) => {
       console.log("Error", error);
   })
   .finally( () => {
       console.log("WEW");
   })
}

GetRankings("Realducky", "Area-52", "US");
