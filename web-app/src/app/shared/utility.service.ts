export class UtilityService {
    component_info: any = null;
    constructor() {

    }

    set_component_info(info) {
        this.component_info = info;
    }
    get_component_info() {
        return this.component_info;
    }

}
