import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { liveQuery } from 'dexie';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts/highstock';
import theme from 'highcharts/themes/high-contrast-dark';
import { Observable } from 'rxjs';
import { TOPICS } from 'src/app/data/topics';
import { db } from 'src/app/db';
import { KeyRecord } from 'src/app/models/key-record.models';
import { computedAsync } from 'src/app/utils/computed-async.utils';
theme(Highcharts);

@Component({
  selector: 'app-statistics-page',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './statistics-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsPageComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor: string = 'stockChart';
  updateFlag = false;

  keyRecords = computedAsync(() => {
    return liveQuery(() => db.keyRecords.toArray()) as any as Observable<
      KeyRecord[]
    >;
  });
  chartOptions = computed<Highcharts.Options | null>(() => {
    const keyRecords = this.keyRecords();
    if (!keyRecords) {
      return null;
    }
    const series = TOPICS.map((t) => ({
      type: 'line' as const,
      data: keyRecords
        .filter((k) => k.cpm && k.topicId === t.id)
        .map((k) => [k.timestamp, k.cpm]),
      name: t.name,
    })).filter((s) => s.data.length > 0);
    return {
      legend: { enabled: true },
      scrollbar: { enabled: false },
      series,
      yAxis: {
        title: {
          text: 'CPM',
        },
      },
    };
  });
}
