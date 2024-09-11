
import { useState } from 'react'

const useDate = (initialReserved = null, initialInService = null) => {

    const [reserved, setReserved] = useState(initialReserved);
    const [inService, setInService] = useState(initialInService);


    function searchin(daySelected) {
        for (let i = 0; i < daySelected.length; i++) {
            const element = daySelected[i];
            const dayFormated = element.format();
            if (searchend(dayFormated) || searchendService(dayFormated)) {
                return true;
            }
        }
    }

    function searchend(dayFormated) {
        for (let i = 0; i < reserved.length; i++) {
            const element = reserved[i];
            if (inrange(dayFormated, element)) {
                return true;
            }
        }
    }

    function inrange(dayFormated, element) {
        var start = null;
        var end = null;
        for (let k = 0; k < element.length; k++) {
            const elementk = element[k];
            start = element[0]
            end = element[1]
            if (elementk === dayFormated) {
                return true
            }
        }
        if (start <= dayFormated && end >= dayFormated) {
            return true
        }
    }


    function searchendService(dayFormated) {
        for (let i = 0; i < inService.length; i++) {
            const element = inService[i];
            if (inrangeService(dayFormated, element)) {
                return true;
            }
        }
    }

    function inrangeService(dayFormated, element) {
        var start = null;
        var end = null;
        for (let k = 0; k < element.length; k++) {
            const elementk = element[k];
            start = element[0]
            end = element[1]
            if (elementk === dayFormated) {
                return true
            }
        }
        if (start <= dayFormated && end >= dayFormated) {
            return true
        }
    }

    return { searchin }
}

export default useDate