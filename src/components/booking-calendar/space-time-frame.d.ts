interface SpaceTimeFrameProps {
    initialSpaceTimes: [string, string][];
    reserved: [string, string][];
    onChangeTimeStart: (timeStart) => void;
    onChangeTimeEnd: (timeEnd) => void;
}

export declare const SpaceTimeFrame: React.FunctionComponent<SpaceTimeFrameProps>;
