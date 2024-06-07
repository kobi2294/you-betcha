import { signalStore, withState } from "@ngrx/signals";
import { initialGroupDetailsSlice } from "./group-details.slice";
import { withLoadMethod } from "@lib";

export const GroupDetailsStore = signalStore(
    withState(initialGroupDetailsSlice),

)