using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using remoteApi.Data;
using remoteApi.DTOs;
using remoteApi.Models;

namespace remoteApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SolicitudesController : ControllerBase
{
    private readonly AppDbContext _context;

    public SolicitudesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> CrearSolicitud(
        [FromBody] CrearSolicitudDto dto)
    {
        Console.WriteLine("=================================");
        Console.WriteLine("COMANDA RECIBIDA");
        Console.WriteLine($"Nombre: {dto.Name}");
        Console.WriteLine($"Descripción: {dto.Payload}");
        Console.WriteLine($"Fecha: {dto.createdAt}");
        Console.WriteLine("=================================");
        if (string.IsNullOrWhiteSpace(dto.Name))
        {
            return BadRequest(new
            {
                mensaje = "El nombre es obligatorio"
            });
        }

        var existente = await _context.Solicitudes
            .FindAsync(dto.Id);

        if (existente != null)
        {
            return StatusCode(200, new
            {
                success = true,
                message = "La solicitud ya estaba respaldada",
                id = existente.Id,
                status = "Processed",
                alreadyExists = true
            });
        }

        var solicitud = new Solicitud
        {
            Id = dto.Id,
            Name = dto.Name,
            Payload = dto.Payload,
            Status = "Processed",
            createdAt = dto.createdAt,
        };


        _context.Solicitudes.Add(solicitud);

        await _context.SaveChangesAsync();

        return StatusCode(201, new
        {
            mensaje = "Solicitud recibida correctamente",
            id = solicitud.Id,
            status = "Processed",
            createdAt = solicitud.createdAt,
            success = true
        });
    }

    [HttpGet]
    public async Task<IActionResult> ObtenerSolicitudes()
    {
        var solicitudes = await _context.Solicitudes
            .OrderByDescending(x => x.createdAt)
            .ToListAsync();

        return Ok(solicitudes);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> ObtenerSolicitud(Guid id)
    {
        var solicitud = await _context.Solicitudes
            .FindAsync(id);

        if (solicitud == null)
        {
            return NotFound(new
            {
                mensaje = "Solicitud no encontrada"
            });
        }
        return Ok(solicitud);
    }
}