import { Injectable, Inject, HttpException, HttpStatus,Logger } from '@nestjs/common';
import type { AxiosInstance,AxiosError } from 'axios';
import { CUSTOM_AXIOS } from '../http/http-config.module';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProfileService {
  private readonly api: string;
  private readonly logger = new Logger(ProfileService.name)
  constructor(
    private readonly configService: ConfigService,
    @Inject(CUSTOM_AXIOS) private readonly axios: AxiosInstance,
  ) {
    this.api = configService.get<string>('CATS_FACTS')!;
  }
  async get() {
   
    
    try {
      if (!this.api) {
          const errorMessage="Cats Fact API URL isnt configured"
         this.logger.log(errorMessage)
        this.logger.log(errorMessage)
        throw new HttpException(
          'Cats Fact API URL isnt configured',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ); 
       
      }
      const { data } = await this.axios.get(this.api);
      if (!data?.fact) {
        const errorMessage="Invalid response from Cat Facts API"
         this.logger.log(errorMessage)
        throw new HttpException(
          errorMessage,
          HttpStatus.BAD_GATEWAY,
        );
      }
      return {
        status: 'success',
        user: {
          email: 'steelmaxima21@gmail.com',
          name: 'Faith Popoola',
          stack: 'Node.js/NestJS',
        },
        timestamp: new Date().toISOString(),
        fact: data.fact,
      };
    } catch (error) {
              const err = error as AxiosError;
              if (err.response){
                const status = err.response.status
                if(status === 429){
                    const errorMessage =
                    'Rate limit exceeded.Please try again later'
                    this.logger.log(errorMessage)
                    throw new HttpException(
                        errorMessage,
                        HttpStatus.TOO_MANY_REQUESTS
                    )
                }else  if(status >= 500){
                      const errorMessage ="External API Error.Please try again later"
                    this.logger.log(errorMessage)
                    throw new HttpException(
                        errorMessage,
                        HttpStatus.BAD_GATEWAY)
                }else  if(err.request){
                     const errorMessage=  "Network Error Could not reach Cat Facts API"
                     this.logger.log(errorMessage)
                    throw new HttpException(
                        errorMessage,
                        HttpStatus.SERVICE_UNAVAILABLE)
                }else  if(status === 500){
                        const errorMessage="Something went wrong"
                    this.logger.log(errorMessage)
                    throw new HttpException(
                     errorMessage,
                        HttpStatus.INTERNAL_SERVER_ERROR)
                }
                else{
                    const errorMessage=`Error from Cat Facts API:${err.response.statusText}`
                        this.logger.log(errorMessage)
                    throw new HttpException(
                        errorMessage,
                        status)
                }
                
              }
     
    }
  }
}
