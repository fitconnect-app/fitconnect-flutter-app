import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:fit_connect/view_model/stats_view_model.dart';

class StatsBarChart extends StatelessWidget {
  final List<DataStats> data;

  const StatsBarChart({super.key, required this.data});

  @override
  Widget build(BuildContext context) {
    return BarChart(
      BarChartData(
        gridData: FlGridData(
          drawVerticalLine: false,
        ),
        barTouchData: BarTouchData(
          touchTooltipData: BarTouchTooltipData(
              tooltipBgColor: Colors.white,
              tooltipBorder: const BorderSide(
                style: BorderStyle.solid,
              ),
              tooltipRoundedRadius: 15,
              getTooltipItem: (group, groupIndex, rod, rodIndex) => BarTooltipItem(
                  '${data.firstWhere((element) => element.id == group.x).label}\n${rod.toY}',
                  const TextStyle(color: Colors.black))),
        ),
        alignment: BarChartAlignment.spaceAround,
        maxY: data.map((e) => e.yValue).reduce((a, b) => a > b ? a : b),
        titlesData: FlTitlesData(
            show: true,
            bottomTitles: AxisTitles(
              axisNameWidget: const Text(''),
              axisNameSize: 0,
              sideTitles: SideTitles(
                showTitles: true,
                getTitlesWidget: (value, titleMeta) {
                  return Padding(
                    padding: const EdgeInsets.only(top: 8.0, bottom: 20.0),
                    child: Text(
                      data[value.toInt()].label,
                      style: const TextStyle(color: Colors.black),
                      textDirection: TextDirection.rtl,
                      textAlign: TextAlign.center,
                    ),
                  );
                },
                reservedSize: 42,
                interval: 1,
              ),
            ),
            leftTitles: AxisTitles(
              axisNameWidget: const Text(''),
              axisNameSize: 0,
              sideTitles: SideTitles(
                showTitles: true,
                reservedSize: 20,
                interval: 1,
              ),
            ),
            rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
            topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false))),
        borderData: FlBorderData(show: false),
        barGroups: data
            .map(
              (e) => BarChartGroupData(
                x: e.id,
                barRods: [
                  BarChartRodData(
                    toY: e.yValue,
                    color: e.color,
                    width: 14,
                  ),
                ],
              ),
            )
            .toList(),
      ),
      swapAnimationDuration: const Duration(milliseconds: 150),
      swapAnimationCurve: Curves.linear,
    );
  }
}
