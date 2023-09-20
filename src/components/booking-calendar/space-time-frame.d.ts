interface SpaceTimeFrameProps {
    initialSpaceTimes: [string, string][];
    reserved: {
        startTime: string;
        endTime: string;
        isAllowed: boolean;
    }[];
    onChangeTimeStart: (timeStart) => void;
    onChangeTimeEnd: (timeEnd) => void;
}

export declare const SpaceTimeFrame: React.FunctionComponent<SpaceTimeFrameProps>;
