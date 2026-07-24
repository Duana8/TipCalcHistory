import { Component, inject } from "@angular/core";
import { TipCalcService } from "../../services/tip-calc/tip-calc.service";

@Component({
    selector:'app-profile-page',
    standalone: true,
    imports: [],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class  ProfileComponent {
    protected tipService = inject(TipCalcService);
}