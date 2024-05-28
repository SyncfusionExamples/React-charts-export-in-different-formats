import { useRef } from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ColumnSeries, Export, Legend, Category, Tooltip, DataLabel, LineSeries, AxisModel, ExportType, IPDFArgs } from '@syncfusion/ej2-react-charts';

function App() {
  const chartInstance = useRef<ChartComponent>(null);
  const dropDownRef = useRef<DropDownListComponent>(null);
  const headerRef = useRef<TextBoxComponent>(null);
  const fileNameRef = useRef<TextBoxComponent>(null);
  const data = [
    { month: 'Jan', sales: 35 }, { month: 'Feb', sales: 28 },
    { month: 'Mar', sales: 34 }, { month: 'Apr', sales: 32 },
    { month: 'May', sales: 40 }, { month: 'Jun', sales: 32 },
    { month: 'Jul', sales: 35 }, { month: 'Aug', sales: 55 },
    { month: 'Sep', sales: 38 }, { month: 'Oct', sales: 30 },
    { month: 'Nov', sales: 25 }, { month: 'Dec', sales: 32 }
  ];
  let exportType: { [key: string]: string }[] = [
    { value: 'JPEG' },
    { value: 'PNG' },
    { value: 'SVG' },
    { value: 'PDF' },
    { value: 'XLSX' },
    { value: 'CSV' }
  ];
  const primaryxAxis: AxisModel = { valueType: 'Category' };
  const clickHandler = () => {
    let header: IPDFArgs = {
      content: headerRef.current.value
    };
    chartInstance.current.exportModule.export(dropDownRef.current.value as ExportType, fileNameRef.current.value, null, null, null, null, null, header);
  }
  return (
    <div>
      <div>
        <DropDownListComponent width={"200px"} dataSource={exportType} ref={dropDownRef} value='JPEG' fields={{ text: 'value', value: 'value' }} />
        <br />
        <TextBoxComponent width={"200px"} ref={headerRef} placeholder='Enter the header content' value='Charts' />
        <br />
        <TextBoxComponent width={"200px"} ref={fileNameRef} placeholder='Enter the filename' value='Sample' />
        <br />
        <button onClick={clickHandler}>Export</button>
      </div>      
      <ChartComponent id='charts' ref={chartInstance} primaryXAxis={primaryxAxis}>
        <Inject services={[ColumnSeries, Legend, Tooltip, DataLabel, Export, LineSeries, Category]} />
        <SeriesCollectionDirective>
          <SeriesDirective dataSource={data} xName='month' yName='sales' type='Column' name='Sales'>
          </SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default App;



