import { FC } from "react";
import { ContainerStyles, FillerStyles, LabelStyles } from "./styles";

export interface IPercentageBar {
    total: number
    completadas: number
    percentage: string
}

export const PercentageBar: FC<IPercentageBar> = ({percentage, total, completadas}) => {
  return (
    <ContainerStyles>
      <FillerStyles percentage={percentage}>
        <div>

          { `${ completadas } de ${ total } tareas completdas`  }
        </div>
        {/* <LabelStyles>{`${percentage}%`}</LabelStyles> */}

      </FillerStyles>
    </ContainerStyles>
  );
};
