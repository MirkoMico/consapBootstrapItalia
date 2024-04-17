export class Richieste {
    //id!: number
    numeroTicket!: number
    applicativo!: {applicativoId:number,descApplicativo: any }
    oggetto!: string
    statoRichiestaConsap!:{ statoRichiestaConsapId: number, descStatoRichiestaConsap:any}
    dataCreazione!:Date
    statoApprovazioneConsap!:{statoApprovazioneConsapId: number,descStatoApprovazioneConsap: any}
    statoApprovazioneOs!:{statoApprovazioneOsId: number, descStatoApprovazioneOs: any}
    statoRichiestaOs!:{statoRichiestaOsId: number, descStatoRichiestaOs: any}
    dataStimaFine!: Date
    importo!: number
    commessaOs!:{commessaOsId: number,codiceCommessa:any, descCommessaOs: any }


}