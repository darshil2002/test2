import { Component } from '@angular/core';
import { virtualProgram } from './datatype';
import { MyserviceService } from 'src/app/services/myservice.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  constructor(private service: MyserviceService) {}
  selectedOptions: any = [];
  programData: any = [];
  projectData: any = [];
  selectedPrograms: virtualProgram[] = [];

  ngOnInit() {
    this.service.getProgramData().subscribe((res) => {
      this.programData = res;
      console.log(this.selectedOptions);
    });

    this.service.getProjectData().subscribe((res) => {
      this.projectData = res;
      console.log(this.projectData);
    });
  }

  selectedProjects: any[] = [];

  updateSelectedPrograms() {
    this.selectedPrograms = Array.from(
      document.querySelectorAll('input[type=checkbox]:checked')
    ).map(
      (checkbox, index, array) =>
        this.programData.virtualProgramList.find(
          (p: any) => p.programName == (checkbox as HTMLInputElement).value
        )!
    );
    this.selectedProjects = this.getFilteredProjects();
    console.log('working update', this.selectedPrograms);
  }
  selectProject(project: any) {
    if (this.selectedProjects.includes(project)) {
      this.selectedProjects = this.selectedProjects.filter(
        (proj) => proj !== project
      );
    } else {
      this.selectedProjects.push(project);
    }
  }
  getFilteredProjects(): any[] {
    let filteredProjects: any[] = [];

    for (let i = 0; i < this.projectData.virtualProgramDetails.length; i++) {
      const project = this.projectData.virtualProgramDetails[i];
      for (let index = 0; index < this.selectedPrograms.length; index++) {
        const program = this.selectedPrograms[index];

        if (
          project.programID == program.programId &&
          filteredProjects.findIndex(
            (res) => res.projectName == project.projectName
          ) == -1
        ) {
          filteredProjects.push(project);
        }
      }
    }
    console.log('project data', this.projectData.virtualProgramDetails);
    console.log('filteredProjects', filteredProjects);
    return filteredProjects;
  }
}
