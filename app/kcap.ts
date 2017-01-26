export class KCap {
  
  // API
  capFill: CapFill;
  capUsages: CapUsages; 

  // Cap specific
  id: string; // bluetooth id
  name: string; // ?
  rssi: number;
  
  getCapUsageJSON(): string[] {
    var stuffs: string[] = [];
    var i = 0;
    for (var j = 0; j < this.capUsages.timeSince.length / 30; j++)
    {
      var index: number[] = [];
      var usages: number[] = [];
      for (; i < 30 * (j + 1) && i < this.capUsages.timeSince.length; i++)
      {
        index.push(i);
        usages.push(this.capUsages.timeSince[i]);
      }
      var usageSet: CapUsages = { 'uniqueId': this.capUsages.uniqueId, 'usageNumber': index, timeSince: usages};
      stuffs.push(JSON.stringify(usageSet));
    }
    return stuffs;
  }
  
  constructor(entry: any) {
    this.id = entry.uniqueid;
    this.name = entry.nameoncap + ": " + entry.pharmacyprescriptionid;
    this.rssi = entry.rssi;
    var prescription: Prescription = {
      pharmacy:{npi:entry.npi},
      prescription:entry.prescription,
      ndc:{ndc:entry.ndc},
      pillQuantity:entry.pillquantity,
      active:entry.active,
      lastUpdate:entry.lastupdate,
      refillCount:entry.refillcount,
      pharmacyPrescriptionId:entry.pharmacyprescriptionid
    };
    
    var fill: Fill = {
      prescription: prescription,
      timePrescribed: entry.timeprescribed,
      lastUpdate: entry.lastupdate,
      uniqueId: entry.uniqueid,
      metaData: {
        nameOnCap: entry.nameoncap,
        zipCodeOnCap: entry.zipcodeoncap
      },
      baseStation: { uniqueId: entry.basestation },
    }
    
    // parse intervals into number array
    let intervals: number[] = [];
    for (let a of entry.intervals.split(",")) {
      intervals.push(parseInt(a));
    }

    this.capFill = {
      fill: fill,
      mode: entry.mode,
      intervals: intervals
    }
    
    // parse usages into number array
    let timeSince: number[] = [];
    for (let a of entry.timesince.split(",")) {
      timeSince.push(parseInt(a));
    }
    
    this.capUsages = {
      uniqueId: entry.uniqueid,
      usageNumber: [],
      timeSince: timeSince
    }
  }
}

class CapFill {
  fill: Fill;
  mode: number;
  intervals: number[];
}
class CapUsages {
  uniqueId: string;
  usageNumber: number[];
  timeSince: number[];
}

class Fill {
  prescription: Prescription;
  timePrescribed: number;
  lastUpdate: number;
  uniqueId: string;
  metaData: MetaData;
  baseStation: BaseStation;
}

class Prescription {
  pharmacy: Pharmacy;
  prescription: string;
  ndc: Ndc;
  pillQuantity: number;
  active: boolean;
  lastUpdate: number;
  refillCount: number;
  pharmacyPrescriptionId: string;
}

class MetaData {
  nameOnCap: string;
  zipCodeOnCap: string;
}

class BaseStation {
  uniqueId: string;
}

class Pharmacy {
  npi: number;
}

class Ndc {
  ndc: string;
}

