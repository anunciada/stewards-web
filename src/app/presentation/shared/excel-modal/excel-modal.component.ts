import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-excel-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './excel-modal.component.html',
  styleUrl: './excel-modal.component.css'
})
export class ExcelModalComponent {

  @Output()
  close = new EventEmitter<void>();

  closeExcelModal() {
    this.close.emit();
  }

  // TYPE FILTER
  selectedTab: 'importar' | 'exportar' = 'importar';

  selectSheetType(type: 'importar' | 'exportar') {
    this.selectedTab = type;
  }

  isSheetTypeSelected(type: 'importar' | 'exportar') {
    return this.selectedTab === type;
  }

  // EXPORT FILES
  isGeneratingFile = false;

  downloadReady = true;

  selectExport() {
    this.selectedTab = 'exportar';
    this.isGeneratingFile = true;
    this.downloadReady = false;

    // depois o backend faz isso
    setTimeout(() => {
      this.isGeneratingFile = false;
      this.downloadReady = true;
    }, 3000);
  }
}