import { EntityRepository, Repository } from "typeorm";
import { Survey } from "../models/Surveys";

@EntityRepository(Survey)
export class SurveysRepository extends Repository<Survey> {
  
}